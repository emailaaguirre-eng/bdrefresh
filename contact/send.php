<?php
/**
 * B&D Servicing - Contact Form Handler
 * PHPMailer + SMTP · Honeypot + rate-limit spam protection
 */

session_start();

// ── Load config ──────────────────────────────────────────────
$configPath = __DIR__ . '/config.php';
if (!file_exists($configPath)) {
    logError('config.php not found');
    respond(false, 'Server configuration error. Please email us directly at info@banddservicing.com');
}
require $configPath;

// ── POST only ────────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    respond(false, 'Method not allowed.');
}

// ── Honeypot ─────────────────────────────────────────────────
if (!empty($_POST['_honey'])) {
    respond(true, 'Message sent successfully.');
}

// ── Rate limiting ────────────────────────────────────────────
$now       = time();
$clientIP  = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$sessKey   = 'contact_last_submit';

if (isset($_SESSION[$sessKey]) && ($now - $_SESSION[$sessKey]) < RATE_LIMIT_PER_SESSION_SECS) {
    $wait = RATE_LIMIT_PER_SESSION_SECS - ($now - $_SESSION[$sessKey]);
    respond(false, "Please wait {$wait} seconds before sending another message.");
}

$rateLimitFile = __DIR__ . '/logs/rate_limits.json';
$rateData = [];
if (file_exists($rateLimitFile)) {
    $rateData = json_decode(file_get_contents($rateLimitFile), true) ?: [];
}
$rateData = array_filter($rateData, fn($e) => ($now - $e['time']) < 3600);
$ipHits   = array_filter($rateData, fn($e) => $e['ip'] === $clientIP);

if (count($ipHits) >= RATE_LIMIT_PER_IP_HOUR) {
    respond(false, 'Too many submissions. Please try again later or email us directly.');
}

// ── Collect & sanitize ───────────────────────────────────────
$limits = ['name' => 100, 'email' => 254, 'phone' => 20, 'service' => 50, 'message' => 5000];

$name    = sanitize($_POST['name']    ?? '', $limits['name']);
$email   = trim(mb_substr($_POST['email'] ?? '', 0, $limits['email']));
$phone   = sanitize($_POST['phone']   ?? '', $limits['phone']);
$service = sanitize($_POST['service'] ?? '', $limits['service']);
$message = sanitize($_POST['message'] ?? '', $limits['message']);

// ── Validate ─────────────────────────────────────────────────
if ($name === '' || $email === '' || $message === '') {
    respond(false, 'Please fill in all required fields (name, email, message).');
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(false, 'Please provide a valid email address.');
}
if (preg_match('/[\r\n]/', $name . $email . $phone)) {
    logError("Header-injection attempt from {$clientIP}");
    respond(false, 'Invalid input detected.');
}

// ── Load PHPMailer ───────────────────────────────────────────
$autoloader = __DIR__ . '/vendor/autoload.php';
if (file_exists($autoloader)) {
    require $autoloader;
} else {
    $src = __DIR__ . '/vendor/phpmailer/phpmailer/src';
    foreach (['Exception.php', 'PHPMailer.php', 'SMTP.php'] as $f) {
        $path = "{$src}/{$f}";
        if (!file_exists($path)) {
            logError("PHPMailer missing: {$path}");
            respond(false, 'Server configuration error. Please email us directly at info@banddservicing.com');
        }
        require_once $path;
    }
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// ── Service label mapping ────────────────────────────────────
$serviceLabels = [
    'custom-app'     => 'Custom Application',
    'internal-tools' => 'Internal Tools',
    'automation'     => 'Automation & API Integration',
    'launch'         => 'Launch & Improve',
    'web-copy'       => 'Web Copy',
    'seo'            => 'Search Engine Optimization',
    'graphic-design' => 'Graphic Design',
    'other'          => 'Other',
];
$serviceDisplay = $serviceLabels[$service] ?? ($service ?: 'Not specified');

// ── Send ─────────────────────────────────────────────────────
try {
    $mail = new PHPMailer(true);

    $mail->isSMTP();
    $mail->Host       = SMTP_HOST;
    $mail->SMTPAuth   = true;
    $mail->Username   = SMTP_USER;
    $mail->Password   = SMTP_PASS;
    $mail->SMTPSecure = SMTP_ENCRYPTION;
    $mail->Port       = SMTP_PORT;

    $mail->setFrom(SMTP_USER, SMTP_FROM_NAME);
    $mail->addReplyTo($email, $name);

    foreach (RECIPIENTS as $to) {
        $mail->addAddress($to);
    }

    $mail->isHTML(true);
    $mail->CharSet = 'UTF-8';
    $mail->Subject = "New Project Inquiry from {$name} - B&D Servicing";
    $mail->Body    = buildEmailHTML($name, $email, $phone, $serviceDisplay, $message);
    $mail->AltBody = buildEmailPlain($name, $email, $phone, $serviceDisplay, $message);

    $mail->send();

    $_SESSION[$sessKey] = $now;
    $rateData[] = ['ip' => $clientIP, 'time' => $now];
    file_put_contents($rateLimitFile, json_encode(array_values($rateData)), LOCK_EX);

    respond(true, 'Message sent successfully.');

} catch (Exception $e) {
    logError("PHPMailer: {$e->getMessage()}");
    respond(false, 'Failed to send your message. Please try again or email us directly at info@banddservicing.com');
}

// ═════════════════════════════════════════════════════════════
//  Helpers
// ═════════════════════════════════════════════════════════════

function sanitize(string $v, int $max): string {
    return htmlspecialchars(mb_substr(trim($v), 0, $max), ENT_QUOTES, 'UTF-8');
}

function respond(bool $ok, string $msg): void {
    $ajax = !empty($_SERVER['HTTP_ACCEPT'])
         && strpos($_SERVER['HTTP_ACCEPT'], 'application/json') !== false;

    if ($ajax) {
        header('Content-Type: application/json');
        if (!$ok) http_response_code(400);
        echo json_encode(['success' => $ok, 'message' => $msg]);
    } else {
        header('Location: ' . ($ok
            ? '/contact/thanks.html'
            : '/#contact?error=' . urlencode($msg)));
    }
    exit;
}

function logError(string $msg): void {
    $dir = __DIR__ . '/logs';
    if (!is_dir($dir)) mkdir($dir, 0750, true);
    $ts = date('Y-m-d H:i:s');
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    error_log("[{$ts}] [{$ip}] {$msg}\n", 3, "{$dir}/contact_errors.log");
}

function buildEmailHTML(string $name, string $email, string $phone,
                        string $service, string $message): string {
    $phone   = $phone ?: 'Not provided';
    $message = nl2br($message);
    return <<<HTML
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;background:#f4f5f7;margin:0;padding:20px}
  .c{max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.08)}
  .hd{background:#080c12;padding:28px 32px}
  .hd h1{color:#fff;font-size:18px;margin:0 0 4px}
  .hd p{color:#8a9bb5;font-size:13px;margin:0}
  .bd{padding:32px}
  .f{margin-bottom:20px}
  .fl{font-size:12px;font-weight:600;color:#5f6a80;text-transform:uppercase;letter-spacing:.05em;margin-bottom:4px}
  .fv{font-size:15px;color:#161a26;line-height:1.5}
  .mb{background:#f4f5f7;border-radius:8px;padding:16px;margin-top:4px}
  hr{border:none;border-top:1px solid #e5e9f0;margin:24px 0}
  .ft{padding:20px 32px;background:#f8f9fc;border-top:1px solid #e5e9f0;text-align:center}
  .ft p{font-size:12px;color:#8a9bb5;margin:0}
  .rb{display:inline-block;background:#2568a0;color:#fff;padding:10px 24px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600;margin-top:16px}
</style>
</head>
<body>
<div class="c">
  <div class="hd">
    <h1>New Project Inquiry</h1>
    <p>Submitted from banddservicing.com contact form</p>
  </div>
  <div class="bd">
    <div class="f"><div class="fl">Name</div><div class="fv">{$name}</div></div>
    <div class="f"><div class="fl">Email</div><div class="fv"><a href="mailto:{$email}">{$email}</a></div></div>
    <div class="f"><div class="fl">Phone</div><div class="fv">{$phone}</div></div>
    <div class="f"><div class="fl">Service Needed</div><div class="fv">{$service}</div></div>
    <hr>
    <div class="f">
      <div class="fl">Project Details</div>
      <div class="mb"><div class="fv">{$message}</div></div>
    </div>
    <div style="text-align:center">
      <a href="mailto:{$email}" class="rb">Reply to {$name}</a>
    </div>
  </div>
  <div class="ft">
    <p>This message was sent from the B&amp;D Servicing website contact form.</p>
  </div>
</div>
</body>
</html>
HTML;
}

function buildEmailPlain(string $name, string $email, string $phone,
                         string $service, string $message): string {
    $phone = $phone ?: 'Not provided';
    return <<<TXT
NEW PROJECT INQUIRY - B&D Servicing
====================================
Name:    {$name}
Email:   {$email}
Phone:   {$phone}
Service: {$service}

Project Details:
{$message}

---
Sent from banddservicing.com contact form
TXT;
}


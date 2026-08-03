/**
 * Server-side project inquiry validation and mail dispatch.
 * No credentials in source — read from process.env only.
 */

export type ContactFormInput = {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
  _honey?: string;
};

export type ContactFormPayload = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

export type ContactValidationResult =
  | { ok: true; data: ContactFormPayload; honeypot: boolean }
  | { ok: false; message: string };

const LIMITS = {
  name: 100,
  email: 254,
  phone: 40,
  service: 80,
  message: 5000,
} as const;

const SERVICE_LABELS: Record<string, string> = {
  "website-builds": "Website Builds",
  "custom-app": "Custom Web Applications",
  "internal-tools": "Internal Tools & Dashboards",
  automation: "Automation & API Integrations",
  "managed-hosting": "Managed Hosting",
  "website-care": "Website Care",
  seo: "SEO",
  "web-copy": "Web Copy",
  "graphic-design": "Graphic Design",
  other: "Other",
};

export function sanitizePlain(value: string, max: number): string {
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, max);
}

export function isValidEmail(email: string): boolean {
  if (email.length < 3 || email.length > LIMITS.email) return false;
  if (/[\r\n]/.test(email)) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateContactForm(input: ContactFormInput): ContactValidationResult {
  const honey = sanitizePlain(String(input._honey ?? ""), 200);
  if (honey !== "") {
    return {
      ok: true,
      honeypot: true,
      data: {
        name: "honeypot",
        email: "honeypot@invalid.local",
        phone: "",
        service: "",
        message: "honeypot",
      },
    };
  }

  const name = sanitizePlain(String(input.name ?? ""), LIMITS.name);
  const email = sanitizePlain(String(input.email ?? ""), LIMITS.email).toLowerCase();
  const phone = sanitizePlain(String(input.phone ?? ""), LIMITS.phone);
  const service = sanitizePlain(String(input.service ?? ""), LIMITS.service);
  const message = sanitizePlain(String(input.message ?? ""), LIMITS.message);

  if (!name || !email || !message) {
    return { ok: false, message: "Please fill in all required fields (name, email, and project details)." };
  }
  if (!isValidEmail(email)) {
    return { ok: false, message: "Please provide a valid email address." };
  }
  if (/[\r\n]/.test(name) || /[\r\n]/.test(phone)) {
    return { ok: false, message: "Invalid input detected." };
  }

  return {
    ok: true,
    honeypot: false,
    data: { name, email, phone, service, message },
  };
}

export function serviceDisplayLabel(service: string): string {
  if (!service) return "Not specified";
  return SERVICE_LABELS[service] ?? service;
}

export function parseRecipientList(raw: string | undefined): string[] {
  if (!raw?.trim()) return [];
  return raw
    .split(/[,;\s]+/)
    .map((part) => part.trim().toLowerCase())
    .filter((part) => isValidEmail(part));
}

export function isDryRunEnabled(env: NodeJS.ProcessEnv = process.env): boolean {
  const v = (env.CONTACT_FORM_DRY_RUN ?? "").trim().toLowerCase();
  return v === "1" || v === "true" || v === "yes";
}

export function buildInquiryEmail(data: ContactFormPayload): { subject: string; text: string; html: string } {
  const service = serviceDisplayLabel(data.service);
  const phone = data.phone || "Not provided";
  const subject = `New Project Inquiry from ${data.name} - B&D Servicing`;
  const text = [
    "NEW PROJECT INQUIRY - B&D Servicing",
    "====================================",
    `Name:    ${data.name}`,
    `Email:   ${data.email}`,
    `Phone:   ${phone}`,
    `Service: ${service}`,
    "",
    "Project Details:",
    data.message,
    "",
    "---",
    "Sent from banddservicing.com project inquiry form",
  ].join("\n");

  const escapedMessage = data.message
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br>");

  const html = `<!DOCTYPE html><html><body style="font-family:system-ui,sans-serif;background:#f4f5f7;padding:20px">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden">
    <div style="background:#080c12;padding:24px 28px;color:#fff">
      <h1 style="margin:0;font-size:18px">New Project Inquiry</h1>
      <p style="margin:6px 0 0;color:#8a9bb5;font-size:13px">Submitted from banddservicing.com</p>
    </div>
    <div style="padding:28px;color:#161a26;font-size:15px;line-height:1.5">
      <p><strong>Name</strong><br>${data.name.replace(/</g, "")}</p>
      <p><strong>Email</strong><br>${data.email}</p>
      <p><strong>Phone</strong><br>${phone}</p>
      <p><strong>Service Needed</strong><br>${service}</p>
      <hr style="border:none;border-top:1px solid #e5e9f0;margin:20px 0">
      <p><strong>Project Details</strong></p>
      <div style="background:#f4f5f7;border-radius:8px;padding:16px">${escapedMessage}</div>
    </div>
  </div>
</body></html>`;

  return { subject, text, html };
}

export type SendInquiryResult =
  | { sent: true; dryRun: boolean }
  | { sent: false; errorCode: "config" | "transport" };

type MailTransport = {
  sendMail: (options: {
    from: string;
    to: string[];
    replyTo?: string;
    subject: string;
    text: string;
    html: string;
  }) => Promise<unknown>;
};

export async function sendInquiryEmail(
  data: ContactFormPayload,
  env: NodeJS.ProcessEnv = process.env,
  transportFactory?: () => Promise<MailTransport>,
): Promise<SendInquiryResult> {
  if (isDryRunEnabled(env)) {
    console.info("[contact-form] dry-run accepted", {
      hasName: Boolean(data.name),
      hasEmail: Boolean(data.email),
      messageLength: data.message.length,
      service: data.service || null,
    });
    return { sent: true, dryRun: true };
  }

  const recipients = parseRecipientList(env.CONTACT_FORM_RECIPIENTS);
  const from = (env.CONTACT_FORM_FROM ?? env.SMTP_USER ?? "").trim();
  const host = (env.SMTP_HOST ?? "").trim();
  const port = Number(env.SMTP_PORT ?? "465");
  const user = (env.SMTP_USER ?? "").trim();
  const pass = env.SMTP_PASS ?? "";
  const secureRaw = (env.SMTP_SECURE ?? "true").trim().toLowerCase();
  const secure = !(secureRaw === "0" || secureRaw === "false" || secureRaw === "no");

  if (!recipients.length || !from || !host || !user || !pass || !Number.isFinite(port)) {
    console.error("[contact-form] mail config incomplete");
    return { sent: false, errorCode: "config" };
  }

  const replyMode = (env.CONTACT_FORM_REPLY_TO_MODE ?? "submitter").trim().toLowerCase();
  const { subject, text, html } = buildInquiryEmail(data);

  try {
    const transport =
      transportFactory !== undefined
        ? await transportFactory()
        : await createNodemailerTransport({ host, port, secure, user, pass });

    await transport.sendMail({
      from,
      to: recipients,
      replyTo: replyMode === "none" ? undefined : data.email,
      subject,
      text,
      html,
    });

    console.info("[contact-form] mail accepted by transport", {
      recipientCount: recipients.length,
      messageLength: data.message.length,
    });
    return { sent: true, dryRun: false };
  } catch {
    console.error("[contact-form] transport failure");
    return { sent: false, errorCode: "transport" };
  }
}

async function createNodemailerTransport(opts: {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
}): Promise<MailTransport> {
  const nodemailer = await import("nodemailer");
  const transporter = nodemailer.createTransport({
    host: opts.host,
    port: opts.port,
    secure: opts.secure,
    auth: { user: opts.user, pass: opts.pass },
  });
  return {
    sendMail: async (mail) =>
      transporter.sendMail({
        from: mail.from,
        to: mail.to.join(", "),
        replyTo: mail.replyTo,
        subject: mail.subject,
        text: mail.text,
        html: mail.html,
      }),
  };
}

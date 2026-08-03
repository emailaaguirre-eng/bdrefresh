/**
 * Focused contact-form unit checks (no SMTP, no secrets).
 * Run: node --import tsx --test scripts/contact-form.test.mjs
 * Or via compiled path using dynamic import of built output — this file
 * exercises the shared module through Node's test runner with tsx if available,
 * otherwise duplicates critical assertions for CI without TypeScript.
 */
import assert from "node:assert/strict";
import test from "node:test";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

async function loadContactForm() {
  // Prefer tsx register when available; fall back to spawning npx tsx to evaluate exports.
  try {
    const mod = await import(pathToFileURL(join(root, "lib/contactForm.ts")).href);
    return mod;
  } catch {
    const require = createRequire(import.meta.url);
    try {
      require.resolve("tsx/cjs");
    } catch {
      // Compile-less fallback: run assertions via npx tsx -e
    }
    const script = `
      import * as m from './lib/contactForm.ts';
      const checks = [];
      const bad = m.validateContactForm({ name: '', email: 'a@b.com', message: 'hi' });
      checks.push(!bad.ok);
      const honey = m.validateContactForm({ name: 'x', email: 'a@b.com', message: 'hi', _honey: 'bot' });
      checks.push(honey.ok && honey.honeypot === true);
      const good = m.validateContactForm({ name: 'Ada', email: 'ada@example.com', message: 'Need a portal' });
      checks.push(good.ok && good.honeypot === false);
      const dry = m.isDryRunEnabled({ CONTACT_FORM_DRY_RUN: 'true' });
      checks.push(dry === true);
      const result = await m.sendInquiryEmail(good.data, { CONTACT_FORM_DRY_RUN: 'true' });
      checks.push(result.sent === true && result.dryRun === true);
      const recipients = m.parseRecipientList('one@example.com, two@example.com');
      checks.push(recipients.length === 2);
      console.log(JSON.stringify(checks));
    `;
    const run = spawnSync(
      "npx",
      ["--yes", "tsx", "-e", script],
      { cwd: root, encoding: "utf8" },
    );
    if (run.status !== 0) {
      throw new Error(run.stderr || run.stdout || "tsx evaluation failed");
    }
    const line = run.stdout.trim().split("\n").filter(Boolean).at(-1);
    const checks = JSON.parse(line);
    return { __checks: checks };
  }
}

test("contact form validation and dry-run", async () => {
  const mod = await loadContactForm();
  if (mod.__checks) {
    assert.deepEqual(mod.__checks, [true, true, true, true, true, true]);
    return;
  }

  const bad = mod.validateContactForm({ name: "", email: "a@b.com", message: "hi" });
  assert.equal(bad.ok, false);

  const honey = mod.validateContactForm({
    name: "x",
    email: "a@b.com",
    message: "hi",
    _honey: "bot",
  });
  assert.equal(honey.ok, true);
  assert.equal(honey.honeypot, true);

  const good = mod.validateContactForm({
    name: "Ada",
    email: "ada@example.com",
    message: "Need a portal",
  });
  assert.equal(good.ok, true);
  assert.equal(good.honeypot, false);

  assert.equal(mod.isDryRunEnabled({ CONTACT_FORM_DRY_RUN: "true" }), true);

  const result = await mod.sendInquiryEmail(good.data, { CONTACT_FORM_DRY_RUN: "true" });
  assert.equal(result.sent, true);
  assert.equal(result.dryRun, true);

  assert.equal(mod.parseRecipientList("one@example.com, two@example.com").length, 2);

  const mocked = await mod.sendInquiryEmail(
    good.data,
    {
      CONTACT_FORM_DRY_RUN: "false",
      CONTACT_FORM_RECIPIENTS: "ops@example.com",
      CONTACT_FORM_FROM: "noreply@example.com",
      SMTP_HOST: "smtp.example.com",
      SMTP_PORT: "465",
      SMTP_USER: "user",
      SMTP_PASS: "pass",
      SMTP_SECURE: "true",
    },
    async () => ({
      sendMail: async () => ({ messageId: "test" }),
    }),
  );
  assert.equal(mocked.sent, true);
  assert.equal(mocked.dryRun, false);
});

#!/usr/bin/env node
/**
 * Keyboard / focus smoke for banddservicing.com
 * Usage: A11Y_BASE_URL=https://banddservicing.com node scripts/keyboard-smoke.mjs
 */
import { chromium } from "playwright";

const base = (process.env.A11Y_BASE_URL || "https://banddservicing.com").replace(/\/$/, "");
const findings = [];

function note(level, where, message) {
  findings.push({ level, where, message });
  const tag = level.toUpperCase();
  console.log(`[${tag}] ${where}: ${message}`);
}

async function accessibleName(page, handle) {
  return page.evaluate((el) => {
    if (!el) return "";
    const labelled = el.getAttribute("aria-label");
    if (labelled) return labelled.trim();
    const labelledBy = el.getAttribute("aria-labelledby");
    if (labelledBy) {
      return labelledBy
        .split(/\s+/)
        .map((id) => document.getElementById(id)?.textContent?.trim() || "")
        .join(" ")
        .trim();
    }
    if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement) {
      const id = el.id;
      if (id) {
        const lab = document.querySelector(`label[for="${CSS.escape(id)}"]`);
        if (lab?.textContent) return lab.textContent.trim();
      }
    }
    return (el.textContent || el.getAttribute("title") || el.getAttribute("placeholder") || "").replace(/\s+/g, " ").trim();
  }, handle);
}

async function focusedDescriptor(page) {
  return page.evaluate(() => {
    const el = document.activeElement;
    if (!el || el === document.body) return { tag: "body", name: "", id: "", role: "" };
    return {
      tag: el.tagName.toLowerCase(),
      id: el.id || "",
      role: el.getAttribute("role") || "",
      name: (
        el.getAttribute("aria-label") ||
        el.textContent ||
        el.getAttribute("placeholder") ||
        ""
      )
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 80),
    };
  });
}

async function tab(page, times = 1) {
  for (let i = 0; i < times; i++) await page.keyboard.press("Tab");
}

async function run() {
  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  try {
    // Fresh consent state
    await page.addInitScript(() => {
      try {
        localStorage.removeItem("bdcc_vt_consent_v1");
      } catch {}
    });

    console.log("\n=== Home: skip link + early focus ===");
    await page.goto(`${base}/`, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForTimeout(2000);

    await page.keyboard.press("Tab");
    const skipHandle = page.locator('a[href="#main-content"]');
    await skipHandle.focus();
    const skipText = (await skipHandle.textContent())?.trim() || "";
    if (/skip/i.test(skipText)) {
      note("pass", "home", `Skip link focusable: "${skipText}"`);
    } else {
      note("fail", "home", "Skip link missing or empty");
    }
    await page.keyboard.press("Enter");
    await page.waitForTimeout(400);
    const mainHasFocus = await page.evaluate(() => {
      const main = document.getElementById("main-content");
      return main === document.activeElement || !!main?.contains(document.activeElement);
    });
    if (mainHasFocus) {
      note("pass", "home", "Skip link moves focus into main content");
    } else {
      const after = await focusedDescriptor(page);
      note("fail", "home", `After skip Enter, focus=${after.tag}#${after.id} "${after.name}"`);
    }

    console.log("\n=== Home: consent chip keyboard ===");
    const banner = page.locator("#bdcc-vt-banner");
    if (await banner.count()) {
      // Focus Accept via locator then Escape
      const accept = banner.locator('[data-act="accept"]');
      if (await accept.count()) {
        await accept.focus();
        note("pass", "consent", "Accept control is focusable");
        await page.keyboard.press("Escape");
        await page.waitForTimeout(200);
        const still = await banner.count();
        if (!still) note("pass", "consent", "Escape dismisses consent banner");
        else note("warn", "consent", "Escape did not dismiss banner");
      }
      // Re-open by clearing and reload is heavy; open prefs via API if present
    } else {
      note("info", "consent", "No banner (prior consent or script not loaded yet)");
    }

    // Ensure banner gone / accept if present for rest of tests
    if (await page.locator("#bdcc-vt-banner [data-act=accept]").count()) {
      await page.locator("#bdcc-vt-banner [data-act=accept]").click();
      await page.waitForTimeout(300);
    }
    if (await page.locator("#bdcc-vt-consent").count()) {
      await page.locator("#bdcc-vt-consent [data-act=save]").click().catch(() => {});
    }

    console.log("\n=== Home: chatbot dialog keyboard ===");
    const toggle = page.locator("#chatbotToggle");
    await toggle.focus();
    await page.keyboard.press("Enter");
    await page.waitForTimeout(500);
    const dialogOpen = await page.locator("#chatbotWindow").count();
    if (dialogOpen) {
      note("pass", "chat", "Toggle opens dialog");
      const inputFocused = await page.evaluate(() => document.activeElement?.id === "bd-chat-input");
      if (inputFocused) note("pass", "chat", "Focus moved to chat input");
      else {
        const f = await focusedDescriptor(page);
        note("warn", "chat", `Expected chat input focus, got ${f.tag}#${f.id} "${f.name}"`);
      }
      await page.keyboard.press("Escape");
      await page.waitForTimeout(300);
      const closed = (await page.locator("#chatbotWindow").count()) === 0;
      if (closed) note("pass", "chat", "Escape closes chat");
      else note("fail", "chat", "Escape did not close chat");
      const backOnToggle = await page.evaluate(() => document.activeElement?.id === "chatbotToggle");
      if (backOnToggle) note("pass", "chat", "Focus restored to toggle");
      else {
        const f = await focusedDescriptor(page);
        note("warn", "chat", `Focus after close: ${f.tag}#${f.id} "${f.name}"`);
      }
    } else {
      note("fail", "chat", "Chat dialog did not open");
    }

    console.log("\n=== Start-project: form labels ===");
    await page.goto(`${base}/start-project`, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForTimeout(1500);
    if (await page.locator("#bdcc-vt-banner [data-act=accept]").count()) {
      await page.locator("#bdcc-vt-banner [data-act=accept]").click();
    }
    const unlabeled = await page.evaluate(() => {
      const bad = [];
      document.querySelectorAll("input:not([type=hidden]):not([type=submit]), select, textarea").forEach((el) => {
        if (el.getAttribute("aria-hidden") === "true" || el.tabIndex < 0 && el.classList.contains("hidden")) return;
        const id = el.id;
        const hasLabel = id && document.querySelector(`label[for="${CSS.escape(id)}"]`);
        const hasAria = el.getAttribute("aria-label") || el.getAttribute("aria-labelledby");
        if (!hasLabel && !hasAria) bad.push(el.tagName + "#" + (id || "?"));
      });
      return bad;
    });
    if (!unlabeled.length) note("pass", "form", "All visible form fields have labels");
    else note("fail", "form", `Unlabeled fields: ${unlabeled.join(", ")}`);

    // Tab into first field
    await page.locator("#name").focus();
    const nameRing = await page.locator("#name").evaluate((el) => {
      const s = getComputedStyle(el);
      return { outline: s.outline, outlineWidth: s.outlineWidth, boxShadow: s.boxShadow };
    });
    if (nameRing.outlineWidth !== "0px" || nameRing.boxShadow.includes("rgb")) {
      note("pass", "form", "Name field shows focus indication");
    } else {
      note("warn", "form", `Name focus styles weak: outline=${nameRing.outline} shadow=${nameRing.boxShadow.slice(0, 60)}`);
    }

    console.log("\n=== Mobile nav Escape (narrow viewport) ===");
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${base}/`, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForTimeout(1500);
    if (await page.locator("#bdcc-vt-banner [data-act=accept]").count()) {
      await page.locator("#bdcc-vt-banner [data-act=accept]").click();
    }
    const menuBtn = page.locator('button[aria-controls="mobile-nav"]');
    await menuBtn.click();
    await page.waitForTimeout(200);
    if (await page.locator("#mobile-nav").count()) {
      note("pass", "mobile-nav", "Menu opens");
      await page.keyboard.press("Escape");
      await page.waitForTimeout(200);
      if ((await page.locator("#mobile-nav").count()) === 0) {
        note("pass", "mobile-nav", "Escape closes menu");
      } else {
        note("fail", "mobile-nav", "Escape did not close menu");
      }
    } else {
      note("fail", "mobile-nav", "Menu did not open");
    }

    console.log("\n=== Tab sample: unnamed interactive controls on home ===");
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(`${base}/`, { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(1500);
    if (await page.locator("#bdcc-vt-banner [data-act=accept]").count()) {
      await page.locator("#bdcc-vt-banner [data-act=accept]").click();
    }
    // Dismiss chat if open
    if (await page.locator("#chatbotWindow").count()) await page.keyboard.press("Escape");

    const unnamed = [];
    for (let i = 0; i < 40; i++) {
      await tab(page);
      const el = await page.evaluateHandle(() => document.activeElement);
      const name = await accessibleName(page, el);
      const meta = await page.evaluate((node) => {
        if (!node || node === document.body) return null;
        return {
          tag: node.tagName.toLowerCase(),
          id: node.id,
          href: node.getAttribute?.("href") || "",
          type: node.getAttribute?.("type") || "",
          role: node.getAttribute?.("role") || "",
        };
      }, el);
      if (!meta) continue;
      if (!name && ["a", "button", "input", "select", "textarea"].includes(meta.tag)) {
        unnamed.push(`${meta.tag}#${meta.id || meta.href || meta.type}`);
      }
    }
    const unique = [...new Set(unnamed)];
    if (!unique.length) note("pass", "tab-order", "No unnamed controls in first 40 tabs");
    else note("fail", "tab-order", `Unnamed controls: ${unique.join(", ")}`);

  } finally {
    await browser.close();
  }

  const fails = findings.filter((f) => f.level === "fail");
  const warns = findings.filter((f) => f.level === "warn");
  console.log(`\n=== Summary: ${fails.length} fail, ${warns.length} warn, ${findings.filter((f) => f.level === "pass").length} pass ===`);
  if (fails.length) process.exit(1);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

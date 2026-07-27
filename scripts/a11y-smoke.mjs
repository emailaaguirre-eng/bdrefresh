#!/usr/bin/env node
/**
 * Axe WCAG 2 A/AA smoke against key marketing routes (Playwright + axe-core).
 * Usage: A11Y_BASE_URL=https://banddservicing.com npm run a11y:smoke
 */
import { createRequire } from "node:module";
import { chromium } from "playwright";

const require = createRequire(import.meta.url);
const axeSource = require("axe-core").source;

const base = (process.env.A11Y_BASE_URL || "https://banddservicing.com").replace(/\/$/, "");
const routes = ["/", "/start-project", "/services", "/about"];

const browser = await chromium.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

let failed = 0;

try {
  for (const route of routes) {
    const url = `${base}${route}`;
    console.log(`\n=== axe: ${url} ===`);
    const page = await browser.newPage();
    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
      await page.waitForTimeout(1500);
      await page.addScriptTag({ content: axeSource });
      const results = await page.evaluate(async () => {
        // eslint-disable-next-line no-undef
        return await axe.run(document, {
          runOnly: { type: "tag", values: ["wcag2a", "wcag2aa"] },
          resultTypes: ["violations"],
        });
      });

      const violations = results.violations || [];
      if (!violations.length) {
        console.log("PASS — 0 violations");
      } else {
        failed += 1;
        console.log(`FAIL — ${violations.length} violation(s)`);
        for (const v of violations) {
          const nodes = (v.nodes || []).slice(0, 5);
          console.log(`\n[${v.impact}] ${v.id}: ${v.help}`);
          console.log(`  ${v.helpUrl}`);
          for (const n of nodes) {
            console.log(`  - ${n.target?.join(" ") || "(target)"}`);
            if (n.failureSummary) {
              console.log(`    ${n.failureSummary.split("\n")[0]}`);
            }
          }
          if ((v.nodes || []).length > 5) {
            console.log(`  … +${v.nodes.length - 5} more`);
          }
        }
      }
    } catch (err) {
      failed += 1;
      console.error(`ERROR — ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      await page.close();
    }
  }
} finally {
  await browser.close();
}

if (failed > 0) {
  console.error(`\na11y smoke failed on ${failed}/${routes.length} route(s).`);
  process.exit(1);
}

console.log(`\na11y smoke passed on ${routes.length} route(s).`);

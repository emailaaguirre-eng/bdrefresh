#!/usr/bin/env node
/**
 * Axe WCAG 2 A/AA smoke against key marketing routes.
 * Usage: A11Y_BASE_URL=https://banddservicing.com npm run a11y:smoke
 *
 * Needs a Chromium binary (provided on GitHub Actions via setup-chrome).
 * Locally, set CHROME_BIN / CHROME_PATH, or install chromium.
 */
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";

const base = (process.env.A11Y_BASE_URL || "https://banddservicing.com").replace(/\/$/, "");
const routes = ["/", "/start-project", "/services", "/about"];

function resolveChrome() {
  const candidates = [
    process.env.CHROME_BIN,
    process.env.CHROME_PATH,
    process.env.GOOGLE_CHROME_BIN,
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/snap/bin/chromium",
  ].filter(Boolean);
  for (const path of candidates) {
    if (existsSync(path)) return path;
  }
  return null;
}

const chrome = resolveChrome();
if (!chrome) {
  console.warn(
    "a11y:smoke skipped: no Chrome/Chromium binary found.\n" +
      "Set CHROME_BIN, or run this job in CI (see .github/workflows/a11y-smoke.yml).",
  );
  process.exit(0);
}

process.env.CHROME_BIN = chrome;
process.env.CHROME_PATH = chrome;

let failed = 0;

for (const route of routes) {
  const url = `${base}${route}`;
  console.log(`\n=== axe: ${url} ===`);
  const result = spawnSync(
    "npx",
    ["--yes", "@axe-core/cli@4.10.1", url, "--exit", "--tags", "wcag2a,wcag2aa"],
    { stdio: "inherit", env: process.env },
  );
  if (result.status !== 0) failed += 1;
}

if (failed > 0) {
  console.error(`\na11y smoke failed on ${failed}/${routes.length} route(s).`);
  process.exit(1);
}

console.log(`\na11y smoke passed on ${routes.length} route(s).`);

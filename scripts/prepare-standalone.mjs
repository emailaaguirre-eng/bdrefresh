/**
 * After `next build` with output: 'standalone', copy static assets into the standalone bundle.
 * Node 18+.
 */
import { cpSync, existsSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const standalone = join(root, ".next", "standalone");
const staticSrc = join(root, ".next", "static");
const staticDest = join(standalone, ".next", "static");
const publicSrc = join(root, "public");
const publicDest = join(standalone, "public");

if (!existsSync(standalone)) {
  console.error("Missing .next/standalone — run `npm run build` first.");
  process.exit(1);
}

mkdirSync(dirname(staticDest), { recursive: true });
cpSync(staticSrc, staticDest, { recursive: true });
cpSync(publicSrc, publicDest, { recursive: true });
console.log("Standalone bundle prepared:", standalone);

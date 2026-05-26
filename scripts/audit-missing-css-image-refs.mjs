/**
 * Audit missing image files referenced from local CSS (`url(...)`).
 * Looks for common image extensions and checks if the mapped file exists.
 *
 * Run:
 *   node scripts/audit-missing-css-image-refs.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");

function walkDir(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walkDir(p, out);
    else out.push(p);
  }
  return out;
}

function urlToLocalDisk(url) {
  const clean = url.split("?")[0];
  if (clean.startsWith("/wp-content/uploads/")) {
    const rel = clean.split("/wp-content/uploads/")[1];
    return path.join(PUBLIC, "assets", "uploads", rel);
  }
  if (clean.startsWith("/wp-content/themes/dispnsary/")) {
    const rel = clean.split("/wp-content/themes/dispnsary/")[1];
    return path.join(PUBLIC, "assets", "theme", rel);
  }
  if (clean.startsWith("/wp-content/plugins/")) {
    const rel = clean.split("/wp-content/plugins/")[1];
    return path.join(PUBLIC, "vendor", "plugins", rel);
  }
  if (clean.startsWith("/wp-includes/")) {
    const rel = clean.split("/wp-includes/")[1];
    return path.join(PUBLIC, "vendor", "wp-includes", rel);
  }
  return null;
}

function normalizeUrl(u) {
  if (!u) return null;
  let s = String(u).trim().replace(/^['"]|['"]$/g, "");
  if (!s) return null;
  if (s.startsWith("data:")) return null;
  if (s.startsWith("http://") || s.startsWith("https://")) return null; // ignore remote (we can't guarantee)
  if (!s.startsWith("/")) s = `/${s}`;
  return s;
}

const IMAGE_EXTS = [".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg", ".mp4", ".webm"];

const cssFiles = walkDir(PUBLIC).filter((p) => p.endsWith(".css"));
const missing = [];

for (const cssPath of cssFiles) {
  const css = fs.readFileSync(cssPath, "utf8");
  for (const m of css.matchAll(/url\(([^)]+)\)/gi)) {
    const raw = m[1].trim();
    const normalized = normalizeUrl(raw);
    if (!normalized) continue;
    const lower = normalized.toLowerCase();
    if (!IMAGE_EXTS.some((ext) => lower.includes(ext))) continue;
    const disk = urlToLocalDisk(normalized);
    if (!disk) continue;
    if (!fs.existsSync(disk)) missing.push({ css: cssPath, url: normalized, disk });
  }
}

missing.sort((a, b) => a.url.localeCompare(b.url));
console.log(`CSS files scanned: ${cssFiles.length}`);
console.log(`Missing local CSS-referenced images: ${missing.length}`);
for (const item of missing.slice(0, 40)) {
  console.log(`- ${item.url} (from ${path.relative(ROOT, item.css)})`);
}


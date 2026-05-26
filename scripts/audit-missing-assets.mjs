/**
 * Audit missing static assets referenced by crawled WordPress page bodies.
 * Finds missing files for:
 * - <img src/srcset>, posters
 * - <video>/<source>
 * - inline style background-image url(...) and generic url(...)
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const MANIFEST = path.join(ROOT, "src", "content", "pages-manifest.json");
const BODIES_DIR = path.join(ROOT, "src", "content", "bodies");
const PUBLIC = path.join(ROOT, "public");

const BASE = "https://demo.awaikenthemes.com/dispnsary";
const BASE_PREFIX = `${BASE}/`;

function normalizeUrl(u) {
  if (!u) return null;
  let s = String(u).trim();
  if (!s) return null;
  // Skip data URIs
  if (s.startsWith("data:")) return null;
  // Convert absolute demo URLs to local absolute paths
  if (s.startsWith(BASE_PREFIX)) s = s.slice(BASE_PREFIX.length);
  if (s.startsWith(BASE + "/")) s = s.slice((BASE + "/").length);
  if (s.startsWith("https://demo.awaikenthemes.com/dispnsary")) {
    s = s.replace("https://demo.awaikenthemes.com/dispnsary", "");
  }
  // Ensure leading slash
  s = s.startsWith("/") ? s : `/${s}`;
  return s;
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

function extractUrlsFromText(text) {
  const urls = new Set();
  if (!text) return urls;

  for (const m of text.matchAll(/\\b(?:src|poster)=['"]([^'"]+)['"]/gi)) urls.add(m[1]);
  for (const m of text.matchAll(/\\bsrcset=['"]([^'"]+)['"]/gi)) {
    const parts = m[1].split(",");
    for (const p of parts) {
      const u = p.trim().split(/\\s+/)[0];
      if (u) urls.add(u);
    }
  }
  for (const m of text.matchAll(/<source[^>]+src=['"]([^'"]+)['"]/gi)) urls.add(m[1]);
  for (const m of text.matchAll(/url\\((['"]?)([^)'"]+)\\1\\)/gi)) urls.add(m[2]);

  return urls;
}

function main() {
  if (!fs.existsSync(MANIFEST)) throw new Error(`Missing ${MANIFEST}`);
  const manifest = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));

  const globalMissing = new Set();
  const missingByRoute = new Map(); // route -> [{url,disk}]

  for (const page of manifest.pages) {
    const fileKey = page.fileKey;
    const bodyPath = path.join(BODIES_DIR, `${fileKey}.html`);
    if (!fs.existsSync(bodyPath)) continue;
    const html = fs.readFileSync(bodyPath, "utf8");

    const urls = extractUrlsFromText(html);
    for (const raw of urls) {
      const normalized = normalizeUrl(raw);
      if (!normalized) continue;
      const disk = urlToLocalDisk(normalized);
      if (!disk) continue;
      if (!fs.existsSync(disk)) {
        globalMissing.add(normalized);
        if (!missingByRoute.has(page.path)) missingByRoute.set(page.path, []);
        missingByRoute.get(page.path).push({ url: normalized, disk });
      }
    }
  }

  const globalMissingArr = [...globalMissing].sort();
  console.log(`Global missing referenced files: ${globalMissingArr.length}`);
  for (const u of globalMissingArr.slice(0, 200)) console.log(u);

  console.log(`\\nMissing by route:`);
  const sorted = [...missingByRoute.entries()].sort((a, b) => b[1].length - a[1].length);
  for (const [route, items] of sorted.slice(0, 20)) {
    const uniq = new Set(items.map((x) => x.url));
    console.log(`- ${route}: ${uniq.size} unique missing`);
  }
}

main();


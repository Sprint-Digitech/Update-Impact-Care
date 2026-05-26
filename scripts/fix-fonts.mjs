/**
 * Fix missing icons/fonts by:
 * 1) Rewriting CSS font-face url() references to local /wp-content/... paths
 *    (relative paths break because we flatten CSS into new filenames).
 * 2) Downloading the referenced font files into public/assets/* and public/vendor/*.
 *
 * Run:
 *   node scripts/fix-fonts.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import https from "https";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");

const BASE = "https://demo.awaikenthemes.com/dispnsary";
const BASE_PREFIX = `${BASE}/`;

function walkDir(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walkDir(p, out);
    else out.push(p);
  }
  return out;
}

function normalizeFontUrl(u) {
  if (!u) return null;
  let s = String(u).trim().replace(/^['"]|['"]$/g, "");
  if (!s) return null;
  if (s.startsWith("data:")) return null;
  if (s.startsWith(BASE_PREFIX)) s = s.slice(BASE_PREFIX.length);
  if (s.startsWith(BASE + "/")) s = s.slice((BASE + "/").length);
  if (s.startsWith("https://demo.awaikenthemes.com/dispnsary")) {
    s = s.replace("https://demo.awaikenthemes.com/dispnsary", "");
  }
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

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          fetchBuffer(new URL(res.headers.location, url).href)
            .then(resolve)
            .catch(reject);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`${url} -> HTTP ${res.statusCode}`));
          return;
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks)));
      })
      .on("error", reject);
  });
}

async function downloadIfMissing(url) {
  const normalized = normalizeFontUrl(url);
  if (!normalized) return { skipped: true, url };
  const disk = urlToLocalDisk(normalized);
  if (!disk) return { skipped: true, url: normalized };
  if (fs.existsSync(disk)) return { skipped: true, url: normalized };
  fs.mkdirSync(path.dirname(disk), { recursive: true });
  const full = normalized.startsWith("/") ? `${BASE}${normalized}` : normalized;
  const buf = await fetchBuffer(full);
  fs.writeFileSync(disk, buf);
  return { downloaded: true, url: normalized };
}

function fixCssFile(cssPath) {
  const p = cssPath.replace(/\\/g, "/");
  let css = fs.readFileSync(cssPath, "utf8");
  let changed = false;

  // DM Sans: make font-face URLs local (covers both vendor-flattened and normal uploads copies)
  {
    const before = css;
    css = css.replaceAll(
      "https://demo.awaikenthemes.com/dispnsary/wp-content/uploads/elementor/google-fonts/fonts/",
      "/wp-content/uploads/elementor/google-fonts/fonts/"
    );
    changed = changed || before !== css;
  }

  // Theme Font Awesome: theme all.min.css (flattened => relative webfonts broken)
  if (p.includes("/theme/dispnsary__assets__css__all.min.css")) {
    const before = css;
    css = css.replaceAll("../webfonts/", "/wp-content/themes/dispnsary/assets/webfonts/");
    changed = changed || before !== css;
  }

  // Elementor bundled Font Awesome (flattened => relative webfonts broken)
  if (
    p.includes("/plugins/elementor__assets__lib__font-awesome__css__") ||
    p.includes("/plugins/elementor__assets__lib__font-awesome__css/")
  ) {
    const before = css;
    css = css.replaceAll("../webfonts/", "/wp-content/plugins/elementor/assets/lib/font-awesome/webfonts/");
    changed = changed || before !== css;
  }

  // ElementsKit icon-pack font (flattened => relative fonts broken)
  if (
    p.includes("elementskit-lite__modules__elementskit-icon-pack__assets__css__ekiticons.css") ||
    p.includes("elementskit-lite/modules/elementskit-icon-pack/assets/css/ekiticons.css")
  ) {
    const before = css;
    css = css.replaceAll("../fonts/", "/wp-content/plugins/elementskit-lite/modules/elementskit-icon-pack/assets/fonts/");
    changed = changed || before !== css;
  }

  if (changed) fs.writeFileSync(cssPath, css, "utf8");
  return changed;
}

function extractFontUrls(css) {
  const out = new Set();
  for (const m of css.matchAll(/url\(([^)]+)\)/gi)) {
    const raw = m[1].trim();
    const cleaned = raw.replace(/^['"]|['"]$/g, "");
    if (!cleaned) continue;
    if (!cleaned.includes(".woff") && !cleaned.includes(".ttf") && !cleaned.includes(".eot") && !cleaned.includes(".woff2") && !cleaned.includes(".svg"))
      continue;
    out.add(cleaned);
  }
  return [...out];
}

async function main() {
  const cssFiles = walkDir(path.join(ROOT, "public")).filter((p) => p.endsWith(".css"));
  console.log(`CSS files: ${cssFiles.length}`);

  let rewritten = 0;
  for (const cssPath of cssFiles) {
    if (fixCssFile(cssPath)) rewritten++;
  }
  console.log(`Rewritten CSS: ${rewritten}`);

  // After rewriting, download all referenced fonts
  const allFontUrls = new Set();
  for (const cssPath of cssFiles) {
    const css = fs.readFileSync(cssPath, "utf8");
    for (const u of extractFontUrls(css)) allFontUrls.add(u);
  }
  console.log(`Font URL candidates: ${allFontUrls.size}`);

  let downloaded = 0;
  let skipped = 0;
  for (const u of allFontUrls) {
    try {
      const res = await downloadIfMissing(u);
      if (res.downloaded) downloaded++;
      else skipped++;
    } catch (e) {
      skipped++;
      // ignore 404 for optional fonts
    }
  }
  console.log(`Fonts downloaded: ${downloaded} | skipped: ${skipped}`);
}

await main();


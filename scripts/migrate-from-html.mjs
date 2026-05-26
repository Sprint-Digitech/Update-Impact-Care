/**
 * One-time migration: parse HTTrack HTML, download assets, generate section modules.
 * Run: node scripts/migrate-from-html.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import https from "https";
import http from "http";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const HTML_PATH = path.join(
  ROOT,
  "..",
  "impac",
  "demo.awaikenthemes.com",
  "dispnsary",
  "index.html"
);
const PUBLIC = path.join(ROOT, "public");
const SECTIONS_DIR = path.join(ROOT, "src", "components", "sections", "content");
const STYLES_CONFIG = path.join(ROOT, "src", "config", "stylesheets.ts");
const SCRIPTS_CONFIG = path.join(ROOT, "src", "config", "scripts.ts");

const BASE_URL = "https://demo.awaikenthemes.com/dispnsary/";
const BASE_HOST = "https://demo.awaikenthemes.com";

const SECTION_MARKERS = [
  { id: "header", start: 'class="ekit-template-content-markup ekit-template-content-header', end: '<div data-elementor-type="wp-page"' },
  { id: "hero", start: 'elementor-element-ac92a47 e-flex e-con-boxed e-con e-parent', end: 'elementor-element-18efdd6 e-flex e-con-boxed e-con e-parent' },
  { id: "about", start: 'elementor-element-18efdd6 e-flex e-con-boxed e-con e-parent', end: 'elementor-element-c223f2b e-flex e-con-boxed e-con e-parent' },
  { id: "services", start: 'elementor-element-c223f2b e-flex e-con-boxed e-con e-parent', end: 'elementor-element-187708a e-flex e-con-boxed e-con e-parent' },
  { id: "why-choose", start: 'elementor-element-187708a e-flex e-con-boxed e-con e-parent', end: 'elementor-element-6adab8f e-flex e-con-boxed e-con e-parent' },
  { id: "how-we-work", start: 'elementor-element-6adab8f e-flex e-con-boxed e-con e-parent', end: 'elementor-element-215b6f0 e-flex e-con-boxed e-con e-parent' },
  { id: "by-the-numbers", start: 'elementor-element-215b6f0 e-flex e-con-boxed e-con e-parent', end: 'elementor-element-b93f3c2 e-flex e-con-boxed e-con e-parent' },
  { id: "faq", start: 'elementor-element-b93f3c2 e-flex e-con-boxed e-con e-parent', end: 'elementor-element-fefcfe5 e-flex e-con-boxed e-con e-parent' },
  { id: "team", start: 'elementor-element-fefcfe5 e-flex e-con-boxed e-con e-parent', end: 'elementor-element-1b5cb68 e-flex e-con-boxed e-con e-parent' },
  { id: "health", start: 'elementor-element-1b5cb68 e-flex e-con-boxed e-con e-parent', end: 'elementor-element-221b7d0 e-flex e-con-boxed e-con e-parent' },
  { id: "cta", start: 'elementor-element-221b7d0 e-flex e-con-boxed e-con e-parent', end: 'elementor-element-cc27dcf e-flex e-con-boxed e-con e-parent' },
  { id: "testimonials", start: 'elementor-element-cc27dcf e-flex e-con-boxed e-con e-parent', end: 'elementor-element-cf3ac54 e-flex e-con-boxed e-con e-parent' },
  { id: "blog", start: 'elementor-element-cf3ac54 e-flex e-con-boxed e-con e-parent', end: 'class="ekit-template-content-markup ekit-template-content-footer' },
  { id: "footer", start: 'class="ekit-template-content-markup ekit-template-content-footer', end: '<script type="speculationrules">' },
];

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;
    client
      .get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          fetchBuffer(new URL(res.headers.location, url).href).then(resolve).catch(reject);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          return;
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks)));
      })
      .on("error", reject);
  });
}

function urlToLocalPath(url) {
  const clean = url.split("?")[0];
  if (clean.includes("/wp-content/uploads/")) {
    const rel = clean.split("/wp-content/uploads/")[1];
    return { disk: path.join(PUBLIC, "assets", "uploads", rel), publicPath: `/assets/uploads/${rel}` };
  }
  if (clean.includes("/wp-content/themes/dispnsary/")) {
    const rel = clean.split("/wp-content/themes/dispnsary/")[1];
    return { disk: path.join(PUBLIC, "assets", "theme", rel), publicPath: `/assets/theme/${rel}` };
  }
  if (clean.includes("/wp-content/plugins/")) {
    const rel = clean.split("/wp-content/plugins/")[1];
    return { disk: path.join(PUBLIC, "vendor", "plugins", rel), publicPath: `/vendor/plugins/${rel}` };
  }
  if (clean.includes("/wp-includes/")) {
    const rel = clean.split("/wp-includes/")[1];
    return { disk: path.join(PUBLIC, "vendor", "wp-includes", rel), publicPath: `/vendor/wp-includes/${rel}` };
  }
  if (clean.includes("/wp-content/uploads/elementor/")) {
    const rel = clean.split("/wp-content/uploads/elementor/")[1];
    return { disk: path.join(PUBLIC, "vendor", "elementor-uploads", rel), publicPath: `/vendor/elementor-uploads/${rel}` };
  }
  if (clean.startsWith(BASE_HOST + "/assets/")) {
    const rel = clean.replace(BASE_HOST + "/assets/", "");
    return { disk: path.join(PUBLIC, "vendor", "awaiken", rel), publicPath: `/vendor/awaiken/${rel}` };
  }
  if (clean.includes("fonts.googleapis.com") || clean.includes("fonts.gstatic.com")) {
    const name = Buffer.from(clean).toString("base64url").slice(0, 40);
    return { disk: path.join(PUBLIC, "vendor", "fonts", `${name}.css`), publicPath: clean, external: true };
  }
  return null;
}

function cssUrlToLocal(url) {
  const clean = url.split("?")[0];
  const hash = Buffer.from(clean).toString("base64url").slice(0, 12);
  const ext = path.extname(clean) || ".css";
  const base = path.basename(clean, ext);
  const fileName = `${base}-${hash}${ext}`;
  if (clean.includes("/wp-content/plugins/")) {
    const rel = clean.split("/wp-content/plugins/")[1].replace(/\//g, "__");
    return { disk: path.join(PUBLIC, "vendor", "css", "plugins", rel), publicPath: `/vendor/css/plugins/${rel}` };
  }
  if (clean.includes("/wp-content/themes/")) {
    const rel = clean.split("/wp-content/themes/")[1].replace(/\//g, "__");
    return { disk: path.join(PUBLIC, "vendor", "css", "theme", rel), publicPath: `/vendor/css/theme/${rel}` };
  }
  if (clean.includes("/wp-includes/")) {
    const rel = clean.split("/wp-includes/")[1].replace(/\//g, "__");
    return { disk: path.join(PUBLIC, "vendor", "css", "wp-includes", rel), publicPath: `/vendor/css/wp-includes/${rel}` };
  }
  if (clean.includes("/wp-content/uploads/")) {
    const rel = clean.split("/wp-content/uploads/")[1].replace(/\//g, "__");
    return { disk: path.join(PUBLIC, "vendor", "css", "uploads", rel), publicPath: `/vendor/css/uploads/${rel}` };
  }
  return { disk: path.join(PUBLIC, "vendor", "css", fileName), publicPath: `/vendor/css/${fileName}` };
}

function jsUrlToLocal(url) {
  const clean = url.split("?")[0];
  if (clean.includes("/wp-content/plugins/")) {
    const rel = clean.split("/wp-content/plugins/")[1];
    return { disk: path.join(PUBLIC, "vendor", "js", "plugins", rel), publicPath: `/vendor/js/plugins/${rel}` };
  }
  if (clean.includes("/wp-content/themes/")) {
    const rel = clean.split("/wp-content/themes/")[1];
    return { disk: path.join(PUBLIC, "vendor", "js", "theme", rel), publicPath: `/vendor/js/theme/${rel}` };
  }
  if (clean.includes("/wp-includes/")) {
    const rel = clean.split("/wp-includes/")[1];
    return { disk: path.join(PUBLIC, "vendor", "js", "wp-includes", rel), publicPath: `/vendor/js/wp-includes/${rel}` };
  }
  if (clean.startsWith(BASE_HOST + "/assets/")) {
    const rel = clean.replace(BASE_HOST + "/assets/", "");
    return { disk: path.join(PUBLIC, "vendor", "js", "awaiken", rel), publicPath: `/vendor/js/awaiken/${rel}` };
  }
  return { disk: path.join(PUBLIC, "vendor", "js", path.basename(clean)), publicPath: `/vendor/js/${path.basename(clean)}` };
}

async function downloadFile(url, diskPath) {
  if (fs.existsSync(diskPath)) return;
  fs.mkdirSync(path.dirname(diskPath), { recursive: true });
  try {
    const buf = await fetchBuffer(url);
    fs.writeFileSync(diskPath, buf);
    console.log("  ✓", path.relative(PUBLIC, diskPath));
  } catch (e) {
    console.warn("  ✗", url, e.message);
  }
}

function rewriteHtml(html, urlMap) {
  let out = html;
  out = out.replaceAll(BASE_URL, "/");
  out = out.replaceAll("https://demo.awaikenthemes.com/dispnsary/", "/");
  for (const [from, to] of urlMap) {
    out = out.split(from).join(to);
    const noQuery = from.split("?")[0];
    if (noQuery !== from) out = out.split(noQuery).join(to);
  }
  return out;
}

function snapToOpeningDiv(html, idx) {
  const divStart = html.lastIndexOf("<div", idx);
  if (divStart !== -1 && idx - divStart < 500) return divStart;
  return idx;
}

function extractBetween(html, startMarker, endMarker) {
  const markerIdx = html.indexOf(startMarker);
  if (markerIdx === -1) throw new Error(`Marker not found: ${startMarker}`);
  const startIdx = snapToOpeningDiv(html, markerIdx);
  const endMarkerIdx = html.indexOf(endMarker, startIdx + startMarker.length);
  if (endMarkerIdx === -1) throw new Error(`End marker not found: ${endMarker}`);
  const endIdx = snapToOpeningDiv(html, endMarkerIdx);
  return html.slice(startIdx, endIdx).trim();
}

function escapeForTemplate(str) {
  return str.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

async function main() {
  console.log("Reading HTML...");
  const html = fs.readFileSync(HTML_PATH, "utf8");
  const urlMap = new Map();

  const assetUrls = new Set();
  const linkRe = /(?:href|src)=["'](https:\/\/demo\.awaikenthemes\.com[^"']+)["']/g;
  let m;
  while ((m = linkRe.exec(html)) !== null) assetUrls.add(m[1]);

  const cssLinks = [];
  const cssRe = /<link[^>]+href=['"](https:\/\/demo\.awaikenthemes\.com[^'"]+\.css[^'"]*)['"]/g;
  while ((m = cssRe.exec(html)) !== null) cssLinks.push(m[1]);

  const scriptSrcs = [];
  const scriptRe = /<script[^>]+src=["'](https:\/\/demo\.awaikenthemes\.com[^"']+)["']/g;
  while ((m = scriptRe.exec(html)) !== null) scriptSrcs.push(m[1]);

  console.log(`\nDownloading ${assetUrls.size} assets...`);
  for (const url of assetUrls) {
    const local = urlToLocalPath(url);
    if (!local || local.external) continue;
    urlMap.set(url, local.publicPath);
    urlMap.set(url.split("?")[0], local.publicPath);
    await downloadFile(url, local.disk);
  }

  console.log(`\nDownloading ${cssLinks.length} stylesheets...`);
  const stylesheetPaths = [];
  for (const url of cssLinks) {
    const local = cssUrlToLocal(url);
    urlMap.set(url, local.publicPath);
    urlMap.set(url.split("?")[0], local.publicPath);
    stylesheetPaths.push(local.publicPath);
    await downloadFile(url, local.disk);
  }

  console.log(`\nDownloading ${scriptSrcs.length} scripts...`);
  const scriptEntries = [];
  for (const url of scriptSrcs) {
    const local = jsUrlToLocal(url);
    urlMap.set(url, local.publicPath);
    scriptEntries.push({ id: path.basename(local.disk, path.extname(local.disk)), src: local.publicPath, original: url });
    await downloadFile(url, local.disk);
  }

  fs.mkdirSync(SECTIONS_DIR, { recursive: true });
  fs.mkdirSync(path.dirname(STYLES_CONFIG), { recursive: true });

  const sectionExports = [];
  for (const section of SECTION_MARKERS) {
    try {
      let chunk = extractBetween(html, section.start, section.end);
      chunk = rewriteHtml(chunk, urlMap);
      const varName = section.id.replace(/-/g, "_").toUpperCase() + "_HTML";
      const filePath = path.join(SECTIONS_DIR, `${section.id}.ts`);
      fs.writeFileSync(
        filePath,
        `/** Auto-generated from original HTML – do not edit manually unless syncing from source */\nexport const ${varName} = \`${escapeForTemplate(chunk)}\`;\n`
      );
      sectionExports.push({ id: section.id, exportName: varName, file: `@/components/sections/content/${section.id}` });
      console.log(`Section: ${section.id} (${chunk.length} chars)`);
    } catch (e) {
      console.warn(`Section ${section.id} skipped:`, e.message);
    }
  }

  fs.writeFileSync(
    path.join(SECTIONS_DIR, "index.ts"),
    sectionExports
      .map((s) => `export { ${s.exportName} } from "./${s.id}";`)
      .join("\n") + "\n"
  );

  const uniqueStyles = [...new Set(stylesheetPaths.map((p) => p))];
  fs.writeFileSync(
    STYLES_CONFIG,
    `/** Auto-generated stylesheet list */\nexport const STYLESHEETS: string[] = ${JSON.stringify(uniqueStyles, null, 2)};\n`
  );

  const orderedScripts = [
    "jquery.min",
    "jquery-migrate",
    "widget-scripts",
    "hooks.min",
    "i18n.min",
    "SmoothScroll",
    "gsap.min",
    "magiccursor",
    "SplitText",
    "ScrollTrigger.min",
    "function",
    "webpack.runtime.min",
    "frontend-modules.min",
    "core.min",
    "frontend.min",
    "mediaelement-and-player.min",
    "mediaelement-migrate.min",
    "wp-mediaelement.min",
    "jquery.magnific-popup.min",
    "jquery-numerator.min",
    "imagesloaded.min",
    "elementor.js",
  ];

  const sortedScripts = scriptEntries.sort((a, b) => {
    const ai = orderedScripts.findIndex((k) => a.src.includes(k) || a.original.includes(k));
    const bi = orderedScripts.findIndex((k) => b.src.includes(k) || b.original.includes(k));
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
  });

  fs.writeFileSync(
    SCRIPTS_CONFIG,
    `/** Auto-generated script list (load order preserved) */\nexport const EXTERNAL_SCRIPTS: { src: string; id?: string }[] = ${JSON.stringify(
      sortedScripts.map((s) => ({ src: s.src, id: s.id })),
      null,
      2
    )};\n`
  );

  const inlineStyles = [];
  const styleRe = /<style[^>]*id="([^"]*)"[^>]*>([\s\S]*?)<\/style>/g;
  while ((m = styleRe.exec(html)) !== null) {
    if (m[1].includes("emoji") || m[1].includes("global-styles")) inlineStyles.push({ id: m[1], content: m[2] });
  }
  fs.writeFileSync(
    path.join(ROOT, "src", "config", "inline-styles.ts"),
    `export const INLINE_STYLES: { id: string; content: string }[] = ${JSON.stringify(inlineStyles)};\n`
  );

  console.log("\nMigration complete.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

/**
 * Crawl all WordPress pages/posts from the live demo and build Next.js content manifest.
 * Run: node scripts/crawl-full-site.mjs
 */
import fs from "fs";
import path from "path";
import https from "https";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const MIRROR_DIR = path.join(ROOT, "mirror", "html");
const PUBLIC = path.join(ROOT, "public");
const MANIFEST_PATH = path.join(ROOT, "src", "content", "pages-manifest.json");

const BASE = "https://demo.awaikenthemes.com/dispnsary";
const BASE_PREFIX = `${BASE}/`;

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "Mozilla/5.0 (compatible; DispnsaryClone/1.0)" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          fetchText(new URL(res.headers.location, url).href).then(resolve).catch(reject);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`${url} -> HTTP ${res.statusCode}`));
          return;
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
      })
      .on("error", reject);
  });
}

function fetchJson(url) {
  return fetchText(url).then((t) => JSON.parse(t));
}

function pathToFileKey(pathname) {
  let p = pathname.replace(/^\/dispnsary\/?/, "").replace(/\/$/, "");
  if (!p) return "index";
  return p.replace(/\//g, "__");
}

function rewriteHtml(html) {
  let out = html;
  out = out.replaceAll(BASE_PREFIX, "/");
  out = out.replaceAll("https://demo.awaikenthemes.com/dispnsary/", "/");
  out = out.replaceAll("https://demo.awaikenthemes.com/dispnsary", "");
  out = out.replaceAll('href="/dispnsary/', 'href="/');
  out = out.replaceAll("href='/dispnsary/", "href='/");
  return out;
}

function extractBodyInner(html) {
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  if (!bodyMatch) throw new Error("No body tag");
  let inner = bodyMatch[1];
  const scriptIdx = inner.search(/<script\s+type=["']speculationrules["']/i);
  if (scriptIdx === -1) {
    const firstScript = inner.search(/<script\s+id=["']ekit-widget-scripts/i);
    if (firstScript !== -1) inner = inner.slice(0, firstScript);
  } else {
    inner = inner.slice(0, scriptIdx);
  }
  return inner.trim();
}

function extractBodyClass(html) {
  const m = html.match(/<body\s+class=["']([^"']+)["']/i);
  return m ? m[1] : "";
}

function extractTitle(html) {
  const m = html.match(/<title>([^<]*)<\/title>/i);
  return m ? m[1].replace(/&#8211;/g, "–").trim() : "Dispnsary";
}

function extractStylesheets(html) {
  const urls = [];
  const re = /<link[^>]+rel=['"]stylesheet['"][^>]+href=['"]([^'"]+)['"]/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    if (!m[1].includes("fonts.googleapis.com")) urls.push(m[1]);
  }
  return [...new Set(urls)];
}

function extractElementorConfig(html) {
  const m = html.match(/<script id="elementor-frontend-js-before">\s*var elementorFrontendConfig = ([\s\S]*?);\s*\n/i);
  return m ? m[1].trim() : null;
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
  return null;
}

async function downloadAsset(url) {
  const local = urlToLocalPath(url.startsWith("http") ? url : `${BASE}${url}`);
  if (!local) return;
  if (fs.existsSync(local.disk)) return;
  fs.mkdirSync(path.dirname(local.disk), { recursive: true });
  try {
    const buf = await fetchText(url.startsWith("http") ? url : `${BASE}${url}`);
    fs.writeFileSync(local.disk, buf);
  } catch {
    /* skip */
  }
}

async function downloadElementorBundles() {
  const dest = path.join(PUBLIC, "vendor", "plugins", "elementor", "assets", "js");
  fs.mkdirSync(dest, { recursive: true });
  let runtime;
  try {
    runtime = fs.readFileSync(path.join(dest, "webpack.runtime.min.js"), "utf8");
  } catch {
    runtime = await fetchText(`${BASE}/wp-content/plugins/elementor/assets/js/webpack.runtime.min.js`);
    fs.writeFileSync(path.join(dest, "webpack.runtime.min.js"), runtime);
  }
  const chunks = new Set();
  const re = /["']([a-z0-9-]+)\.([a-f0-9]{8,32})\.bundle(?:\.min)?\.js["']/gi;
  let m;
  while ((m = re.exec(runtime)) !== null) {
    chunks.add(`${m[1]}.${m[2]}.bundle.min.js`);
  }
  const re2 = /\/([a-z0-9-]+\.[a-f0-9]{8,32}\.bundle\.min\.js)/gi;
  while ((m = re2.exec(runtime)) !== null) chunks.add(m[1]);

  console.log(`Downloading ${chunks.size} Elementor bundle candidates...`);
  for (const file of chunks) {
    const disk = path.join(dest, file);
    if (fs.existsSync(disk)) continue;
    try {
      const data = await fetchText(`${BASE}/wp-content/plugins/elementor/assets/js/${file}`);
      fs.writeFileSync(disk, data);
      console.log("  bundle", file);
    } catch {
      /* 404 ok */
    }
  }
}

async function collectRoutes() {
  const routes = new Map();

  const pages = await fetchJson(`${BASE}/wp-json/wp/v2/pages?per_page=100`);
  for (const p of pages) {
    const u = new URL(p.link);
    routes.set(u.pathname.replace(/\/$/, "") || "/dispnsary", {
      path: u.pathname.replace(/^\/dispnsary/, "") || "/",
      url: p.link,
      title: p.title?.rendered?.replace(/<[^>]+>/g, "") || p.slug,
      type: "page",
    });
  }

  const posts = await fetchJson(`${BASE}/wp-json/wp/v2/posts?per_page=100`);
  for (const p of posts) {
    const u = new URL(p.link);
    routes.set(u.pathname.replace(/\/$/, ""), {
      path: u.pathname.replace(/^\/dispnsary/, "") || "/",
      url: p.link,
      title: p.title?.rendered?.replace(/<[^>]+>/g, "") || p.slug,
      type: "post",
    });
  }

  return [...routes.values()];
}

async function main() {
  fs.mkdirSync(MIRROR_DIR, { recursive: true });
  fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });

  console.log("Collecting routes from WordPress API...");
  const routes = await collectRoutes();
  console.log(`Found ${routes.length} routes`);

  await downloadElementorBundles();

  const manifest = [];
  const allStyles = new Set();
  const assetUrls = new Set();

  for (const route of routes) {
    const fileKey = pathToFileKey(new URL(route.url).pathname);
    console.log(`Fetching ${route.path} (${fileKey})...`);

    try {
      const html = await fetchText(route.url.endsWith("/") ? route.url : `${route.url}/`);
      const rewritten = rewriteHtml(html);
      fs.writeFileSync(path.join(MIRROR_DIR, `${fileKey}.html`), rewritten);

      const bodyHtml = extractBodyInner(rewritten);
      const bodyClass = extractBodyClass(rewritten);
      const title = extractTitle(rewritten);
      const stylesheets = extractStylesheets(rewritten).map((u) =>
        u.replace(BASE_PREFIX, "/").replace("https://demo.awaikenthemes.com/dispnsary/", "/")
      );
      stylesheets.forEach((s) => allStyles.add(s));

      const elementorConfig = extractElementorConfig(rewritten);

      const linkRe = /(?:href|src)=["']([^"']+)["']/g;
      let m;
      while ((m = linkRe.exec(rewritten)) !== null) {
        if (m[1].includes("wp-content") || m[1].includes("wp-includes")) assetUrls.add(m[1]);
      }

      manifest.push({
        path: route.path === "/" ? "/" : route.path.replace(/\/$/, "") || "/",
        fileKey,
        title,
        bodyClass,
        type: route.type,
        stylesheets,
        elementorConfig,
        bodyLength: bodyHtml.length,
      });

      const bodiesDir = path.join(ROOT, "src", "content", "bodies");
      fs.mkdirSync(bodiesDir, { recursive: true });
      fs.writeFileSync(path.join(bodiesDir, `${fileKey}.html`), bodyHtml);
      fs.writeFileSync(
        path.join(bodiesDir, `${fileKey}.meta.json`),
        JSON.stringify({ bodyClass, title, path: route.path }, null, 2)
      );
    } catch (e) {
      console.warn(`  FAILED ${route.path}:`, e.message);
    }
  }

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify({ pages: manifest, generatedAt: new Date().toISOString() }, null, 2));

  console.log(`\nDownloading ${assetUrls.size} asset references (incremental)...`);
  let i = 0;
  for (const url of assetUrls) {
    i++;
    if (i % 50 === 0) console.log(`  ${i}/${assetUrls.size}`);
    const full = url.startsWith("http") ? url : url.startsWith("/") ? `${BASE}${url}` : `${BASE_PREFIX}${url}`;
    await downloadAsset(full);
  }

  console.log("\nDone.", manifest.length, "pages in manifest");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

/**
 * Fetch the remote WordPress 404 template HTML and extract:
 * - bodyClass
 * - bodyHtml (without <script> tags)
 *
 * Output:
 *  - src/content/bodies/404.html
 *  - src/content/bodies/404.meta.json
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import https from "https";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const BODIES_DIR = path.join(ROOT, "src", "content", "bodies");
const OUT_BODY = path.join(BODIES_DIR, "404.html");
const OUT_META = path.join(BODIES_DIR, "404.meta.json");

const URL = "https://demo.awaikenthemes.com/dispnsary/404/";
const BASE = "https://demo.awaikenthemes.com/dispnsary";

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
        let d = "";
        res.on("data", (c) => (d += c));
        res.on("end", () => resolve({ statusCode: res.statusCode, text: d }));
      })
      .on("error", reject);
  });
}

function rewriteHtml(html) {
  // Match existing approach: strip base prefix so Next rewrites local assets.
  let out = html;
  out = out.replaceAll(BASE + "/", "/");
  return out;
}

function extractBody(html) {
  const bodyMatch = html.match(/<body[^>]*class=['"]([^'"]+)['"][^>]*>/i);
  const bodyClass = bodyMatch?.[1] || "";
  const bodyStartIdx = html.indexOf(">");
  const bodyTagIdx = html.toLowerCase().indexOf("<body");
  if (bodyTagIdx === -1) throw new Error("No <body> tag");
  const openBody = html.indexOf(">", bodyTagIdx);
  const closeBody = html.toLowerCase().lastIndexOf("</body>");
  if (openBody === -1 || closeBody === -1) throw new Error("Could not slice body");

  let bodyHtml = html.slice(openBody + 1, closeBody);

  // Remove <script> tags to avoid inline execution issues.
  bodyHtml = bodyHtml.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  // Remove speculationrules (harmless but we avoid it)
  bodyHtml = bodyHtml.replace(/<script[^>]*type=['"]speculationrules['"][^>]*>[\s\S]*?<\/script>/gi, "");

  // Rewrite base prefix in body so assets point to local.
  bodyHtml = rewriteHtml(bodyHtml);
  return { bodyClass, bodyHtml };
}

const result = await fetchText(URL);
if (!result.text) throw new Error("No response body");

const { bodyClass, bodyHtml } = extractBody(result.text);
fs.mkdirSync(BODIES_DIR, { recursive: true });
fs.writeFileSync(OUT_BODY, bodyHtml.trim(), "utf8");
fs.writeFileSync(
  OUT_META,
  JSON.stringify({ bodyClass, title: "404 - Dispnsary", path: "/404/" }, null, 2),
  "utf8"
);
console.log(`Fetched 404 template (HTTP ${result.statusCode})`);
console.log(`Wrote ${path.relative(ROOT, OUT_BODY)} and ${path.relative(ROOT, OUT_META)}`);


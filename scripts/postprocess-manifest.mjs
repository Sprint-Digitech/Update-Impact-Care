/**
 * Normalize manifest elementor configs and build global stylesheet union.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const MANIFEST = path.join(ROOT, "src", "content", "pages-manifest.json");
const STYLES_OUT = path.join(ROOT, "src", "config", "stylesheets.ts");

function normalizeConfig(raw) {
  if (!raw) return raw;
  return raw
    .replaceAll(
      "https:\\/\\/demo.awaikenthemes.com\\/dispnsary\\/wp-content\\/plugins\\/elementor\\/assets\\/",
      "\\/vendor\\/plugins\\/elementor\\/assets\\/"
    )
    .replaceAll(
      "https://demo.awaikenthemes.com/dispnsary/wp-content/plugins/elementor/assets/",
      "/vendor/plugins/elementor/assets/"
    )
    .replaceAll(
      "https:\\/\\/demo.awaikenthemes.com\\/dispnsary\\/wp-content\\/uploads",
      "\\/assets\\/uploads"
    )
    .replaceAll(
      "https://demo.awaikenthemes.com/dispnsary/wp-content/uploads",
      "/assets/uploads"
    );
}

const data = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
const union = new Set();

for (const page of data.pages) {
  page.elementorConfig = normalizeConfig(page.elementorConfig);
  page.stylesheets = page.stylesheets.filter((s) => !s.includes("fonts.googleapis.com"));
  page.stylesheets.forEach((s) => union.add(s.split("?")[0]));
}

fs.writeFileSync(MANIFEST, JSON.stringify(data, null, 2));

const list = [...union].sort();
fs.writeFileSync(
  STYLES_OUT,
  `/** Auto-generated union of all page stylesheets */\nexport const STYLESHEETS: string[] = ${JSON.stringify(list, null, 2)};\n`
);

console.log("Pages:", data.pages.length, "| Stylesheets:", list.length);

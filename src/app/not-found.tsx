import fs from "fs";
import path from "path";
import { ClientWordPressPage as WordPressPage } from "@/components/page/ClientWordPressPage";

const BODIES_DIR = path.join(process.cwd(), "src", "content", "bodies");
const BODY_FILE = path.join(BODIES_DIR, "404.html");
const META_FILE = path.join(BODIES_DIR, "404.meta.json");

const bodyHtml = fs.existsSync(BODY_FILE) ? fs.readFileSync(BODY_FILE, "utf8") : "";
const meta = fs.existsSync(META_FILE) ? JSON.parse(fs.readFileSync(META_FILE, "utf8")) : null;

export default function GlobalNotFound() {
  return (
    <WordPressPage
      bodyHtml={bodyHtml}
      bodyClass={meta?.bodyClass || "wp-theme-dispnsary tt-magic-cursor"}
      elementorConfig={null}
    />
  );
}


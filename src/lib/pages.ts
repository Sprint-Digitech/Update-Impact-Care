import fs from "fs";
import path from "path";
import manifestData from "@/content/pages-manifest.json";

export type PageManifestEntry = {
  path: string;
  fileKey: string;
  title: string;
  bodyClass: string;
  type: string;
  stylesheets: string[];
  elementorConfig: string | null;
  bodyLength: number;
};

type Manifest = {
  pages: PageManifestEntry[];
  generatedAt: string;
};

const manifest = manifestData as Manifest;
const BODIES_DIR = path.join(process.cwd(), "src", "content", "bodies");

export function getAllPages(): PageManifestEntry[] {
  return manifest.pages;
}

export function getPageByPath(urlPath: string): PageManifestEntry | undefined {
  const normalized =
    urlPath === "/" || urlPath === ""
      ? "/"
      : urlPath.endsWith("/")
        ? urlPath.slice(0, -1)
        : urlPath;
  return manifest.pages.find((p) => p.path === normalized);
}

export function getPageBodyHtml(fileKey: string): string {
  const filePath = path.join(BODIES_DIR, `${fileKey}.html`);
  return fs.readFileSync(filePath, "utf8");
}

export function pathToSlugSegments(urlPath: string): string[] | undefined {
  if (urlPath === "/" || !urlPath) return undefined;
  return urlPath.replace(/^\//, "").replace(/\/$/, "").split("/");
}

export function slugSegmentsToPath(segments?: string[]): string {
  if (!segments || segments.length === 0) return "/";
  return `/${segments.join("/")}`;
}

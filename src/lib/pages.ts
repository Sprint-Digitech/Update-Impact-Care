import fs from "fs";
import path from "path";
import manifestData from "@/content/pages-manifest.json";
import { products } from "@/lib/data/products";

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

// Dynamically generate entries for all 48 products to support routing
const productPages: PageManifestEntry[] = products.map(p => ({
  path: `/products/${p.slug}`,
  fileKey: `product__${p.slug}`,
  title: p.title,
  bodyClass: 'page-template-default page page-id-10083 wp-custom-logo wp-theme-dispnsary tt-magic-cursor elementor-default elementor-template-full-width elementor-kit-8 elementor-page',
  type: 'page',
  stylesheets: [],
  elementorConfig: null,
  bodyLength: 0
}));

// Combine static manifest pages with dynamic product pages
const allMergedPages = [...manifest.pages];
productPages.forEach(p => {
  if (!allMergedPages.find(ap => ap.path === p.path)) {
    allMergedPages.push(p);
  }
});

export function getAllPages(): PageManifestEntry[] {
  return allMergedPages;
}

export function getPageByPath(urlPath: string): PageManifestEntry | undefined {
  const normalized =
    urlPath === "/" || urlPath === ""
      ? "/"
      : urlPath.endsWith("/")
        ? urlPath.slice(0, -1)
        : urlPath;
  return allMergedPages.find((p) => p.path === normalized);
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

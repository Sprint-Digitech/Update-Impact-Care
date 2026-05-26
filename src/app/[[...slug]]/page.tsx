import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WordPressPage } from "@/components/page/WordPressPage";
import {
  getAllPages,
  getPageBodyHtml,
  getPageByPath,
  slugSegmentsToPath,
} from "@/lib/pages";

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

export async function generateStaticParams() {
  const params = getAllPages()
    .filter((p) => p.path !== "/")
    .map((p) => ({
      slug: p.path.replace(/^\//, "").split("/").filter(Boolean),
    }));
  return [{ slug: [] as string[] }, ...params];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageByPath(slugSegmentsToPath(slug));
  if (!page) return { title: "Not Found" };
  return {
    title: page.title,
    description: `${page.title} – Dispnsary medical and healthcare website.`,
  };
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const urlPath = slugSegmentsToPath(slug);
  const page = getPageByPath(urlPath);

  if (!page) notFound();

  const bodyHtml = getPageBodyHtml(page.fileKey);

  return (
    <WordPressPage
      bodyHtml={bodyHtml}
      bodyClass={page.bodyClass}
      elementorConfig={page.elementorConfig}
    />
  );
}

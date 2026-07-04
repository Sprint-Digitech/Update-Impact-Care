import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ClientWordPressPage as WordPressPage } from "@/components/page/ClientWordPressPage";
import {
  getAllPages,
  getPageBodyHtml,
  getPageByPath,
  slugSegmentsToPath,
} from "@/lib/pages";
import { ProductsCatalog } from "@/components/products/ProductsCatalog";
import { ProductDetailPage } from "@/components/products/ProductDetailPage";
import { HomeSlider } from "@/components/home/HomeSlider";
import { parseWordPressLayout, parseWordPressDetailLayout, parseHomeSliderLayout } from "@/lib/server-parser";
import { products } from "@/lib/data/products";
import { HtmlBlock } from "@/components/ui/HtmlBlock";

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
  const urlPath = slugSegmentsToPath(slug);
  const page = getPageByPath(urlPath);
  if (!page) return { title: "Not Found" };

  if (urlPath === "/" || urlPath === "/home-slider" || urlPath === "/home-image" || urlPath === "/home-video") {
    return {
      title: "West Africa Best Medical Products Supplier-Impact Healthcare",
      description: "Impact Care, healthcare solutions, affordable medicines, HPV awareness, patient resources, health articles, medical research",
      openGraph: {
        title: "West Africa Best Medical Products Supplier-Impact Healthcare",
        description: "Impact Care, healthcare solutions, affordable medicines, HPV awareness, patient resources, health articles, medical research",
        type: "website",
      }
    };
  }

  if (urlPath === "/about-us") {
    return {
      title: "Know About the Best West African Healthcare Solution",
      description: "We are committed to providing Medical Healthcare supplies. Our Mission & Vision include Custom Formulation, Contract Manufacturing, & Burkina Faso, Côte d'Ivoire, Senegal, Togo, Benin, Guinea, Mali, Niger, Gabon Testing.",
      openGraph: {
        title: "Know About the Best West African Healthcare Solution",
        description: "We are committed to providing Medical Healthcare supplies. Our Mission & Vision include Custom Formulation, Contract Manufacturing, & Burkina Faso, Côte d'Ivoire, Senegal, Togo, Benin, Guinea, Mali, Niger, Gabon Testing.",
        type: "article",
      }
    };
  }

  if (urlPath === "/products") {
    return {
      title: "Buy Affordable Medicine | Export pharmaceutical products",
      description: "Export pharmaceutical products for healthcare needs. Buy Medicine at affordable prices in Burkina Faso, Côte d'Ivoire, Senegal, Togo & West Africa.",
      openGraph: {
        title: "Buy Affordable Medicine | Export pharmaceutical products",
        description: "Export pharmaceutical products for healthcare needs. Buy Medicine at affordable prices in Burkina Faso, Côte d'Ivoire, Senegal, Togo & West Africa.",
      }
    };
  }

  if (urlPath === "/manufacturing") {
    return {
      title: "Impact Health Care - Medicine manufacturing company",
      description: "Impact Health Care - medicine manufacturing company offers fast delivery, custom formulation, contract manufacturing, Burkina Faso, Côte d'Ivoire, Senegal, Togo, Benin, Guinea, Mali, Niger, Gabon in West Africa",
      openGraph: {
        title: "Impact Health Care - Medicine manufacturing company",
        description: "Impact Health Care - medicine manufacturing company offers fast delivery, custom formulation, contract manufacturing, Burkina Faso, Côte d'Ivoire, Senegal, Togo, Benin, Guinea, Mali, Niger, Gabon in West Africa",
        type: "article",
      }
    };
  }

  if (urlPath === "/contact-us") {
    return {
      title: "Impact Healthcare Pharmaceuticals West Africa",
      description: "Impact Care contact, healthcare support, customer service, medical inquiries, connect with Impact Care, healthcare assistance",
      openGraph: {
        title: "Impact Healthcare Pharmaceuticals West Africa",
        description: "Impact Care contact, healthcare support, customer service, medical inquiries, connect with Impact Care, healthcare assistance",
        type: "article",
      }
    };
  }

  if (urlPath === "/blog") {
    return {
      title: "Explore informative healthcare blog posts at Impact Care.",
      description: "Impact Care blog, healthcare insights, medical research, HPV awareness, patient resources, wellness articles, health tips",
      openGraph: {
        title: "Explore informative healthcare blog posts at Impact Care.",
        description: "Impact Care blog, healthcare insights, medical research, HPV awareness, patient resources, wellness articles, health tips",
        type: "article",
      }
    };
  }

  if (urlPath === "/careers") {
    return {
      title: "Careers at Impact Healthcare | Join the Impact Family",
      description: "Careers - Join Impact Healthcare's diverse, employee-friendly team. Thrive in a supportive, growth-driven culture. Apply today: info@impactcare.co.in",
      openGraph: {
        title: "Careers at Impact Healthcare | Join the Impact Family",
        description: "Careers - Join Impact Healthcare's diverse, employee-friendly team. Thrive in a supportive, growth-driven culture. Apply today: info@impactcare.co.in",
        type: "article",
      }
    };
  }

  return {
    title: page.title,
    description: `${page.title} – Impact Healthcare.`,
  };
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const urlPath = slugSegmentsToPath(slug);
  const page = getPageByPath(urlPath);

  if (!page) notFound();

  // 1. Intercept the products catalog page
  if (urlPath === "/products") {
    const rawHtml = getPageBodyHtml(page.fileKey);
    const layout = parseWordPressLayout(rawHtml);

    return (
      <WordPressPage
        bodyHtml={rawHtml}
        bodyClass={page.bodyClass}
        elementorConfig={page.elementorConfig}
      >
        <HtmlBlock html={layout.headStyles + layout.preloader + layout.cursor + layout.header} />
        <div className="elementor elementor-947">
          <HtmlBlock html={layout.heroBanner} />
          <ProductsCatalog />
          <HtmlBlock html={layout.lowerContent} />
        </div>
        <HtmlBlock html={layout.footer} />
      </WordPressPage>
    );
  }

  // 2. Intercept the home slider page ONLY
  if (urlPath === "/home-slider") {
    const rawHtml = getPageBodyHtml(page.fileKey);
    const elementorClass = page.fileKey === "index" ? ".elementor-13" : ".elementor-10180";
    const layout = parseHomeSliderLayout(rawHtml, elementorClass);

    return (
      <WordPressPage
        bodyHtml={rawHtml}
        bodyClass={page.bodyClass}
        elementorConfig={page.elementorConfig}
      >
        <HtmlBlock html={layout.headStyles + layout.preloader + layout.cursor + layout.header} />
        <HomeSlider />
        <div className={`elementor ${elementorClass.replace('.', '')}`}>
          <HtmlBlock html={layout.lowerContent} />
        </div>
        <HtmlBlock html={layout.footer} />
      </WordPressPage>
    );
  }

  // 3. Intercept any individual product detail page
  if (urlPath.startsWith("/products/")) {
    const productSlug = urlPath.replace("/products/", "");
    const product = products.find(p => p.slug === productSlug);
    if (!product) notFound();

    // Use product__acofan-tablet as the clean layout master frame template
    const templateHtml = getPageBodyHtml("product__acofan-tablet");
    const layout = parseWordPressDetailLayout(templateHtml);

    // Dynamically replace the hardcoded "Acofan 100mg/500mg Tablet" name with the current product title
    const dynamicHeroBanner = layout.heroBanner
      .replace(/>Acofan 100mg\/500mg Tablet</gi, `>${product.title}<`)
      .replace(/Home \/ Products \/ Acofan 100mg\/500mg Tablet/gi, `Home / Products / ${product.title}`);


    return (
      <WordPressPage
        bodyHtml={templateHtml}
        bodyClass={page.bodyClass}
        elementorConfig={page.elementorConfig}
      >
        <HtmlBlock html={layout.headStyles + layout.preloader + layout.cursor + layout.header} />
        <div className="elementor elementor-10083">
          <HtmlBlock html={dynamicHeroBanner} />
          <ProductDetailPage product={product} />
        </div>
        <HtmlBlock html={layout.footer} />
      </WordPressPage>
    );
  }

  // 3. Fallback standard WordPress page rendering
  const bodyHtml = getPageBodyHtml(page.fileKey);

  return (
    <WordPressPage
      bodyHtml={bodyHtml}
      bodyClass={page.bodyClass}
      elementorConfig={page.elementorConfig}
    />
  );
}
// Trigger hot-reload 150

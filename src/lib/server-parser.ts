import * as cheerio from "cheerio";

export function parseWordPressLayout(html: string) {
  const $ = cheerio.load(html);

  // 1. Extract Head Styles
  const headStyles = $("head style").parent().html() || "";

  // 2. Extract Preloader & Header
  const preloader = $.html($(".preloader")) || "";
  const cursor = $.html($("#magic-cursor")) || "";
  const header = $.html($(".ekit-template-content-header")) || "";

  // 3. Extract Main content parts
  const mainContent = $('.elementor.elementor-947');
  
  let heroBanner = "";
  let lowerContent = "";
  
  mainContent.children().each((i, el) => {
    // Child 0 is the hero banner
    if (i === 0) {
      heroBanner = $.html(el);
    } else if (i > 1) {
      // Child 2, 3 etc are the content below the products grid
      lowerContent += $.html(el);
    }
  });

  // 4. Extract Footer
  const footer = $.html($(".ekit-template-content-footer")) || "";

  return {
    headStyles,
    preloader,
    cursor,
    header,
    heroBanner,
    lowerContent,
    footer
  };
}

export function parseWordPressDetailLayout(html: string) {
  const $ = cheerio.load(html);

  // 1. Extract Head Styles
  const headStyles = $("head style").parent().html() || "";

  // 2. Extract Preloader & Header
  const preloader = $.html($(".preloader")) || "";
  const cursor = $.html($("#magic-cursor")) || "";
  const header = $.html($(".ekit-template-content-header")) || "";

  // 3. Extract Main content (elementor-10083)
  const mainContent = $('.elementor.elementor-10083');
  
  let heroBanner = "";
  mainContent.children().each((i, el) => {
    if (i === 0) {
      heroBanner = $.html(el);
    }
  });

  // 4. Extract Footer
  const footer = $.html($(".ekit-template-content-footer")) || "";

  return {
    headStyles,
    preloader,
    cursor,
    header,
    heroBanner,
    footer
  };
}

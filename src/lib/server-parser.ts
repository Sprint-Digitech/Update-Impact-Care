import * as cheerio from "cheerio";

export function parseWordPressLayout(html: string) {
  const $ = cheerio.load(html);
  const headStyles = $("head style").parent().html() || "";
  const preloader = $.html($(".preloader")) || "";
  const cursor = $.html($("#magic-cursor")) || "";
  const header = $.html($(".custom-header-wrapper")) || $.html($(".ekit-template-content-header")) || "";
  const mainContent = $('.elementor.elementor-947');
  
  let heroBanner = "";
  let lowerContent = "";
  mainContent.children().each((i, el) => {
    if (i === 0) {
      heroBanner = $.html(el);
    } else if (i > 1) {
      lowerContent += $.html(el);
    }
  });

  const footer = $.html($(".ekit-template-content-footer")) || "";

  return { headStyles, preloader, cursor, header, heroBanner, lowerContent, footer };
}

export function parseWordPressDetailLayout(html: string) {
  const $ = cheerio.load(html);
  const headStyles = $("head style").parent().html() || "";
  const preloader = $.html($(".preloader")) || "";
  const cursor = $.html($("#magic-cursor")) || "";
  const header = $.html($(".custom-header-wrapper")) || $.html($(".ekit-template-content-header")) || "";
  const mainContent = $('.elementor.elementor-10083');
  
  let heroBanner = "";
  mainContent.children().each((i, el) => {
    if (i === 0) {
      heroBanner = $.html(el);
    }
  });

  const footer = $.html($(".ekit-template-content-footer")) || "";

  return { headStyles, preloader, cursor, header, heroBanner, footer };
}

export function parseHomeSliderLayout(html: string, elementorClass: string = '.elementor-10180') {
  const $ = cheerio.load(html);
  const headStyles = $("head style").parent().html() || "";
  const preloader = $.html($(".preloader")) || "";
  const cursor = $.html($("#magic-cursor")) || "";
  const header = $.html($(".custom-header-wrapper")) || $.html($(".ekit-template-content-header")) || "";
  
  // Extract lower content (everything after the hero section)
  const mainContent = $(elementorClass);
  let lowerContent = "";
  mainContent.children().each((i, el) => {
    if (i > 0) {
      const clone = cheerio.load($.html(el), null, false);
      clone('.ekit-template-content-footer').remove();
      lowerContent += clone.html();
    }
  });

  const footer = $.html($(".ekit-template-content-footer")) || "";

  return { headStyles, preloader, cursor, header, lowerContent, footer };
}

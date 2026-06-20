const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const bodiesDir = 'c:/Users/akkik/OneDrive/Desktop/New-Impact-Care/src/content/bodies';
const footerTsPath = 'c:/Users/akkik/OneDrive/Desktop/New-Impact-Care/src/components/sections/content/footer.ts';

function updateHtml(htmlStr, isContactUs) {
  const $ = cheerio.load(htmlStr, null, false);
  
  // Update footer contact items
  $('.footer-contact-item').each((i, el) => {
    const text = $(el).text().trim();
    if (text.includes('New Jersey') || text.includes('Delhi') || text.includes('INDIA') || text.includes('Agrasen') || text.includes('Sector 9') || text.includes('Royal Ln')) {
        const infobox = $(el).find('.elementskit-infobox');
        if (infobox.parent().is('a')) {
          infobox.parent().attr('href', '/contact-us#map');
          infobox.parent().attr('class', 'ekit_global_links');
        } else {
          infobox.wrap('<a href="/contact-us#map" class="ekit_global_links"></a>');
        }
    }
  });

  if (isContactUs) {
    $('.elementskit-info-box-title').each((i, el) => {
       const text = $(el).text();
       if (text.includes('New Jersey') || text.includes('Delhi') || text.includes('INDIA') || text.includes('Agrasen') || text.includes('Sector 9')) {
         const wrapper = $(el).closest('.elementor-widget-elementskit-icon-box'); // The info box wrapper
         if (wrapper.length > 0) {
            const infobox = wrapper.find('.elementskit-infobox');
            if (infobox.parent().is('a')) {
              infobox.parent().attr('href', '#map');
            } else {
              infobox.wrap('<a href="/contact-us#map" class="ekit_global_links"></a>');
            }
         }
       }
    });

    let mapWrapper = $('.elementor-widget-google_maps').closest('.e-con-child');
    if (mapWrapper.length === 0) {
       mapWrapper = $('.elementor-widget-google_maps').closest('.elementor-element');
    }
    if (mapWrapper.length === 0) {
       mapWrapper = $('iframe[src*="google.com/maps"]').closest('.elementor-element');
    }
    if (mapWrapper.length > 0) {
       mapWrapper.attr('id', 'map');
    }
  }

  return $.html();
}

let str = fs.readFileSync(footerTsPath, 'utf8');
let htmlStart = str.indexOf('`') + 1;
let htmlEnd = str.lastIndexOf('`');
let htmlStr = str.substring(htmlStart, htmlEnd);
let newHtml = updateHtml(htmlStr, false);
if (newHtml !== htmlStr) {
  let newTsContent = str.substring(0, htmlStart) + newHtml + str.substring(htmlEnd);
  fs.writeFileSync(footerTsPath, newTsContent, 'utf8');
  console.log('Modified footer.ts');
}

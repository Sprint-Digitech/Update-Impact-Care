const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('src/content/bodies/contact-us.html', 'utf8');
const $ = cheerio.load(html);

const widgets = $('.ekit_social_media');
const correctWidgetHtml = $.html(widgets.eq(0));
const brokenWidget = widgets.eq(1);

// Replace broken widget's HTML with the correct one
brokenWidget.replaceWith(correctWidgetHtml);

fs.writeFileSync('src/content/bodies/contact-us.html', $.html());
console.log("Fixed social media widget on contact-us page!");

const fs = require('fs');
const html = fs.readFileSync('src/content/bodies/home-slider.html', 'utf8');
const cheerio = require('cheerio');
const $ = cheerio.load(html);
const slider = $('.elementskit-advanced-slider').first();
console.log(slider.attr('data-widget_settings'));

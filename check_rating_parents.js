const fs = require('fs');
const html = fs.readFileSync('src/content/bodies/home-image.html', 'utf8');
const cheerio = require('cheerio');
const $ = cheerio.load(html);
const parents = $('.google-rating').first().parents().map((i, el) => $(el).attr('class') || el.tagName).get();
console.log(parents);

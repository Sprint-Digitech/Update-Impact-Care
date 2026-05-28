const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('src/content/bodies/product__acofan-tablet.html', 'utf8');
const $ = cheerio.load(html);

const mainContent = $('.elementor.elementor-10083');
let heroBanner = "";
mainContent.children().each((i, el) => {
  if (i === 0) {
    heroBanner = $.html(el);
  }
});

console.log('Hero Banner Length:', heroBanner.length);
console.log('Hero Banner sample:', heroBanner.substring(0, 100));

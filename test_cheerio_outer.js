const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('src/content/bodies/products.html', 'utf8');
const $ = cheerio.load(html);

console.log('Preloader outerHTML:', $.html($('.preloader')));
console.log('Cursor outerHTML:', $.html($('#magic-cursor')));
console.log('Header outerHTML:', $.html($('.ekit-template-content-header')));
console.log('Footer outerHTML:', $.html($('.ekit-template-content-footer')));

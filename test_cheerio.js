const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('src/content/bodies/products.html', 'utf8');
const $ = cheerio.load(html);
const preloaderParent = $('.preloader').parent();
console.log('Preloader parent tag:', preloaderParent.get(0).tagName);
console.log('Preloader HTML length:', preloaderParent.html().length);

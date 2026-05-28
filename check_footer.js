const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('src/content/bodies/home-slider.html', 'utf8');
const $ = cheerio.load(html);
const footerInMain = $('.elementor-10180').find('.ekit-template-content-footer').length;
console.log('Footer in main elementor-10180: ' + footerInMain);

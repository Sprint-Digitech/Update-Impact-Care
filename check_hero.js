const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('src/content/bodies/quality.html', 'utf8');
const $ = cheerio.load(html);
console.log($('.top-hero-banner').attr('class'));
console.log($('.top-hero-banner').attr('style'));
console.log($('.top-hero-banner').html().substring(0,500));

const fs = require('fs');
const html = fs.readFileSync('src/content/bodies/index.html', 'utf8');
const cheerio = require('cheerio');
const $ = cheerio.load(html);
console.log($('h3.elementor-heading-title').first().parent().html());

const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('src/content/bodies/index.html', 'utf8');
const $ = cheerio.load(html);
console.log($('.custom-header-wrapper').html()?.substring(0, 500));

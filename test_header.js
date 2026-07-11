const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('src/content/bodies/index.html', 'utf8');
const $ = cheerio.load(html, null, false);
console.log('Header length:', $('.ekit-template-content-header').length);

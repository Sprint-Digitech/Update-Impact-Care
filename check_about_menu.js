const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('src/content/bodies/about-us.html', 'utf8');
const $ = cheerio.load(html);
const items = $('#menu-header-menu > li > a').map((i, el) => $(el).text().trim()).get();
console.log('about-us.html menu: ' + items.join(', '));

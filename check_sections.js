const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('src/content/bodies/about-us.html', 'utf8');
const $ = cheerio.load(html);

console.log('bfc9648 text:', $('[data-id="bfc9648"]').text().replace(/\s+/g, ' ').substring(0, 200));
console.log('bf4debc text:', $('[data-id="bf4debc"]').text().replace(/\s+/g, ' ').substring(0, 200));
console.log('6e38495 text:', $('[data-id="6e38495"]').text().replace(/\s+/g, ' ').substring(0, 200));
console.log('d7aa488 text:', $('[data-id="d7aa488"]').text().replace(/\s+/g, ' ').substring(0, 200));

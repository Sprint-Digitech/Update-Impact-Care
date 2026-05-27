const fs = require('fs');
const html = fs.readFileSync('old_index_orig.html', 'utf16le');
const cheerio = require('cheerio');
const $ = cheerio.load(html);
console.log($('#menu-item-10341').html());

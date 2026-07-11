const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('src/content/bodies/index.html', 'utf8');
const $ = cheerio.load(html);
$('.custom-header-wrapper a[href^="/products/?category="]').each((i, el) => {
    console.log($.html(el));
});

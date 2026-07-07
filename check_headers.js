const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('src/content/bodies/index.html', 'utf8');
const $ = cheerio.load(html);
$('.elementskit-card-header').each(function() {
    console.log($(this).text().trim());
});

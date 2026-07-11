const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('src/content/bodies/index.html', 'utf8');
const $ = cheerio.load(html);
$('.custom-header-wrapper a').each((i, el) => {
    console.log($(el).text().trim(), '->', $(el).attr('href'));
});

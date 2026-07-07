const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('src/content/bodies/rd.html', 'utf8');
const $ = cheerio.load(html);

$('[data-elementor-type="wp-page"]').children().each((i, el) => {
    console.log(`Child ${i}:`, $(el).prop('tagName'), $(el).attr('class'));
});

const fs = require('fs');
const html = fs.readFileSync('src/content/bodies/quality.html', 'utf8');
const cheerio = require('cheerio');
const $ = cheerio.load(html);
console.log("Hero banner HTML:");
console.log($('.top-hero-banner').html());
console.log("------------------");
console.log("wp-page children:");
$('[data-elementor-type="wp-page"]').children().each((i, el) => {
    console.log(`Child ${i}:`, $(el).prop('tagName'), $(el).attr('class'));
});

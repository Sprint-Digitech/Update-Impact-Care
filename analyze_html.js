const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('src/content/bodies/manufacturing.html', 'utf8');
const $ = cheerio.load(html);

console.log("=== TOP LEVEL ===");
$('body').children().each((i, el) => {
    console.log($(el).prop('tagName'), 'class=' + $(el).attr('class'), 'id=' + $(el).attr('id'));
});

console.log("\n=== ELEMENTOR CONTAINER CHILDREN ===");
$('[data-elementor-type="wp-page"]').children().each((i, el) => {
    console.log($(el).prop('tagName'), 'class=' + $(el).attr('class'), 'id=' + $(el).attr('id'));
});

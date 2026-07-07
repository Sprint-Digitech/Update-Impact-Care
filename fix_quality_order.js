const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('src/content/bodies/quality.html', 'utf8');
const $ = cheerio.load(html, { decodeEntities: false }, false);

const wpPage = $('[data-elementor-type="wp-page"]');
const children = wpPage.children().toArray();

console.log("Original Order:");
children.forEach((el, i) => {
    console.log(`Child ${i}:`, $(el).attr('class') || $(el).prop('tagName'));
});

// We need to find the hero banner and move it to the top.
// The hero banner has class "elementor-element-11af3d9"
let heroIndex = -1;
children.forEach((el, i) => {
    if ($(el).hasClass('elementor-element-11af3d9') || $(el).hasClass('top-hero-banner')) {
        heroIndex = i;
    }
});

console.log("Hero banner found at index:", heroIndex);

if (heroIndex > 0) {
    const heroEl = children[heroIndex];
    $(heroEl).remove();
    wpPage.prepend(heroEl);
}

console.log("\nNew Order:");
wpPage.children().toArray().forEach((el, i) => {
    console.log(`Child ${i}:`, $(el).attr('class') || $(el).prop('tagName'));
});

// Save to see if this fixes the layout first
let finalHtml = $.html();
if (finalHtml.includes('<html><head>')) {
    finalHtml = finalHtml.replace(/<html><head>.*?<\/head><body>/s, '');
    finalHtml = finalHtml.replace(/<\/body><\/html>/, '');
}

fs.writeFileSync('src/content/bodies/quality.html', finalHtml);
console.log("\nMoved hero banner back to the top.");

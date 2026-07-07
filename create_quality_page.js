const fs = require('fs');
const cheerio = require('cheerio');

// Copy manufacturing.html as a base
let html = fs.readFileSync('src/content/bodies/manufacturing.html', 'utf8');

const $ = cheerio.load(html, { decodeEntities: false }, false);

// 1. Update the Hero Title
$('.top-hero-banner h1.elementor-heading-title').text('Quality');
// Update breadcrumb
$('.ekit-breadcrumb li:last-child').text('Quality');

// Update the background image to our new AI image
const heroSection = $('.top-hero-banner');
let style = heroSection.attr('style') || '';
// Replace the background-image URL
style = style.replace(/background-image:\s*url\([^)]+\)/, 'background-image: url("/assets/images/quality-hero-banner.png")');
if (!style.includes('background-image')) {
    style += ' background-image: url("/assets/images/quality-hero-banner.png");';
}
heroSection.attr('style', style);


// 2. Remove the Awaken manufacturing sections
$('.mfg-awaken-intro').remove();
$('.mfg-awaken-strengths').remove();
$('.mfg-awaken-impact').remove();

// 3. Make sure the title tag is updated
$('title').text('Quality - Impact Care');

// 4. Save as quality.html
let finalHtml = $.html();
if (finalHtml.includes('<html><head>')) {
    finalHtml = finalHtml.replace(/<html><head>.*?<\/head><body>/s, '');
    finalHtml = finalHtml.replace(/<\/body><\/html>/, '');
}
fs.writeFileSync('src/content/bodies/quality.html', finalHtml);

console.log("Created quality.html with the new AI Hero banner and cleared body content.");

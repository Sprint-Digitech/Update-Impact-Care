const fs = require('fs');
const cheerio = require('cheerio');

// Copy manufacturing.html as a base to get the exact header/footer and hero styles
let html = fs.readFileSync('src/content/bodies/manufacturing.html', 'utf8');

// We need to replace the body content while keeping the header/footer and the Elementor Hero section
const $ = cheerio.load(html, { decodeEntities: false }, false);

// 1. Update the Hero Title
$('.top-hero-banner h1.elementor-heading-title').text('Research & Development');
// Update breadcrumb
$('.ekit-breadcrumb li:last-child').text('Research & Development');
// Update the background image to our new AI image
const heroSection = $('.top-hero-banner');
let style = heroSection.attr('style') || '';
// Replace the background-image URL
style = style.replace(/background-image:\s*url\([^)]+\)/, 'background-image: url("/assets/images/rd-hero-banner.png")');
// In case it doesn't have an inline style yet or we just want to force it:
if (!style.includes('background-image')) {
    style += ' background-image: url("/assets/images/rd-hero-banner.png");';
}
heroSection.attr('style', style);


// 2. Remove the 3 Awaken manufacturing sections we appended earlier
$('.mfg-awaken-intro').remove();
$('.mfg-awaken-strengths').remove();
$('.mfg-awaken-impact').remove();

// 3. Make sure the title tag is updated
$('title').text('Research & Development - Impact Care');

// 4. Save as rd.html
let finalHtml = $.html();
if (finalHtml.includes('<html><head>')) {
    finalHtml = finalHtml.replace(/<html><head>.*?<\/head><body>/s, '');
    finalHtml = finalHtml.replace(/<\/body><\/html>/, '');
}
fs.writeFileSync('src/content/bodies/rd.html', finalHtml);

console.log("Created rd.html with the new AI Hero banner and cleared body content.");

const fs = require('fs');
const cheerio = require('cheerio');

// 1. Fix CSS
let css = fs.readFileSync('src/styles/globals.css', 'utf8');
// Replace the .mfg-strengths-heading to have white color
css = css.replace(/\.mfg-strengths-heading\s*\{[^}]+\}/, 
`.mfg-strengths-heading {
    text-align: center;
    font-size: 42px;
    font-weight: 800;
    margin-bottom: 60px;
    color: #ffffff; /* FIXED COLOR */
}`);
fs.writeFileSync('src/styles/globals.css', css);


// 2. Clean up old content in manufacturing.html
let html = fs.readFileSync('src/content/bodies/manufacturing.html', 'utf8');
const $ = cheerio.load(html, { decodeEntities: false }, false);

// We need to keep:
// 1. The <style id="top-hero-banner-styles"> block
// 2. The <div data-elementor-type="wp-page" data-elementor-id="29" class="elementor elementor-29">
//      and inside it, ONLY the first <section> which is the hero banner.
//      And remove any other old <section> or <div> inside the Elementor wrapper.
// 3. Keep the 3 new Awaken sections (mfg-awaken-intro, mfg-awaken-strengths, mfg-awaken-impact).

// Actually, in previous steps we appended the Awaken sections to '[data-elementor-type="wp-page"]'.
// Let's look at the children of the elementor container.
const elementorContainer = $('[data-elementor-type="wp-page"]');

// We want to keep the FIRST elementor section (hero) and the THREE awaken divs.
// Any other elementor sections (the old content) should be deleted.
const allSections = elementorContainer.children('.elementor-section');
// Keep only the first one, delete the rest
allSections.each((index, el) => {
    if (index > 0) {
        $(el).remove();
    }
});

let finalHtml = $.html();
if (finalHtml.includes('<html><head>')) {
    finalHtml = finalHtml.replace(/<html><head>.*?<\/head><body>/s, '');
    finalHtml = finalHtml.replace(/<\/body><\/html>/, '');
}

fs.writeFileSync('src/content/bodies/manufacturing.html', finalHtml);
console.log("Fixed CSS color and deleted old manufacturing content.");

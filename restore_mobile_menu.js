const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const bodiesDir = path.join(__dirname, 'src', 'content', 'bodies');
const origFile = path.join(bodiesDir, 'index_orig.html');

// Read the original file that has the hamburger menu
const origHtml = fs.readFileSync(origFile, 'utf-8');
const $orig = cheerio.load(origHtml);

// Try to find .ekit-template-content-header
let headerEl = $orig('.ekit-template-content-header');
if (headerEl.length === 0) {
    // If not found, maybe it's just <header> or .elementor-location-header
    headerEl = $orig('header');
}

if (headerEl.length === 0) {
    console.error("Could not find header in index_orig.html");
    process.exit(1);
}

// Get the exact HTML string for the header
const headerHtmlString = $orig.html(headerEl);

const filesToUpdate = fs.readdirSync(bodiesDir).filter(f => f.endsWith('.html') && f !== 'index_orig.html');

let successCount = 0;
for (const file of filesToUpdate) {
    const filePath = path.join(bodiesDir, file);
    const html = fs.readFileSync(filePath, 'utf-8');
    const $file = cheerio.load(html);
    
    let targetHeader = $file('.ekit-template-content-header');
    if (targetHeader.length === 0) {
        targetHeader = $file('header');
    }
    
    if (targetHeader.length > 0) {
        targetHeader.replaceWith(headerHtmlString);
        let outHtml = $file.html();
        fs.writeFileSync(filePath, outHtml, 'utf-8');
        successCount++;
        console.log(`Restored mobile menu in ${file}`);
    } else {
        console.log(`Skipped ${file} (no header found)`);
    }
}
console.log(`Done. Restored in ${successCount} files.`);

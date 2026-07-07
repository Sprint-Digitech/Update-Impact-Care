const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const bodiesDir = path.join(__dirname, 'src', 'content', 'bodies');
const homeFile = path.join(bodiesDir, 'index.html');

// Read index.html
const homeHtml = fs.readFileSync(homeFile, 'utf-8');
const $home = cheerio.load('<div id="dummy-root">' + homeHtml + '</div>', { decodeEntities: false }, false);

// Extract the header block
const headerBlock = $home('.ekit-template-content-header').parent().html();
if (!headerBlock) {
    console.error("Could not find header in index.html");
    process.exit(1);
}

// Extract the exact HTML string for the header
const headerHtmlString = $home.html($home('.ekit-template-content-header'));

const files = fs.readdirSync(bodiesDir);
let updatedCount = 0;

for (const file of files) {
    if (file === 'index.html' || !file.endsWith('.html')) {
        continue;
    }
    
    const filePath = path.join(bodiesDir, file);
    
    const html = fs.readFileSync(filePath, 'utf-8');
    const $file = cheerio.load('<div id="dummy-root">' + html + '</div>', { decodeEntities: false }, false);
    
    const targetHeader = $file('.ekit-template-content-header');
    
    if (targetHeader.length > 0) {
        // Replace the header
        targetHeader.replaceWith(headerHtmlString);
        
        let outHtml = $file('#dummy-root').html();
        fs.writeFileSync(filePath, outHtml, 'utf-8');
        console.log(`Updated header in ${file}`);
        updatedCount++;
    }
}

console.log(`Done. Updated headers in ${updatedCount} files.`);

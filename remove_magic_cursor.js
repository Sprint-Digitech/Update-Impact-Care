const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'src', 'content', 'bodies');
const files = fs.readdirSync(dirPath).filter(file => file.endsWith('.html'));

let fixCount = 0;

for (const file of files) {
    const filePath = path.join(dirPath, file);
    let html = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Remove preloader block
    const preloaderRegex = /<div class="preloader">[\s\S]*?<\/div>\s*<\/div>/;
    if (preloaderRegex.test(html)) {
        html = html.replace(preloaderRegex, '');
        modified = true;
    }

    // Remove magic-cursor block
    const magicCursorRegex = /<div id="magic-cursor">\s*<div id="ball"><\/div>\s*<\/div>/;
    if (magicCursorRegex.test(html)) {
        html = html.replace(magicCursorRegex, '');
        modified = true;
    }

    // Remove skip-link
    const skipLinkRegex = /<a class="skip-link screen-reader-text" href="#content">[\s\S]*?<\/a>/;
    if (skipLinkRegex.test(html)) {
        html = html.replace(skipLinkRegex, '');
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(filePath, html, 'utf8');
        fixCount++;
    }
}

console.log('Fixed ' + fixCount + ' files.');

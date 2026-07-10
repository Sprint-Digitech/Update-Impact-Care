const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'src', 'content', 'bodies');
const files = fs.readdirSync(dirPath).filter(file => file.endsWith('.html'));

let fixCount = 0;

for (const file of files) {
    const filePath = path.join(dirPath, file);
    let html = fs.readFileSync(filePath, 'utf8');

    if (html.includes('</header>\\n\\n<div')) {
        html = html.replace(/<\/header>\\n\\n<div/g, '</header>\n\n<div');
        fs.writeFileSync(filePath, html, 'utf8');
        fixCount++;
    } else if (html.includes('</header>\\n\\n')) {
        html = html.replace(/<\/header>\\n\\n/g, '</header>\n\n');
        fs.writeFileSync(filePath, html, 'utf8');
        fixCount++;
    } else if (html.includes('\\n\\n<div data-elementor-type=')) {
        html = html.replace(/\\n\\n<div data-elementor-type=/g, '\n<div data-elementor-type=');
        fs.writeFileSync(filePath, html, 'utf8');
        fixCount++;
    }
}

console.log('Fixed ' + fixCount + ' files.');

const fs = require('fs');
const path = require('path');

const bodiesDir = path.join(__dirname, 'src', 'content', 'bodies');
const filesToUpdate = fs.readdirSync(bodiesDir).filter(f => f.endsWith('.html'));

let successCount = 0;
for (const file of filesToUpdate) {
    const filePath = path.join(bodiesDir, file);
    let html = fs.readFileSync(filePath, 'utf-8');
    
    // Replace the javascript to include stopPropagation()
    if (html.includes('e.preventDefault();') && !html.includes('e.stopPropagation();')) {
        html = html.replace('e.preventDefault();', 'e.preventDefault();\n            e.stopPropagation();');
        fs.writeFileSync(filePath, html, 'utf-8');
        successCount++;
    }
}
console.log(`Updated ${successCount} files with stopPropagation.`);

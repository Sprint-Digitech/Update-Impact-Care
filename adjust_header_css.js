const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'src', 'content', 'bodies');
const files = fs.readdirSync(dirPath).filter(file => file.endsWith('.html'));

let count = 0;

for (const file of files) {
    const fullPath = path.join(dirPath, file);
    let content = fs.readFileSync(fullPath, 'utf8');
    
    let changed = false;
    
    if (content.includes('padding: 15px 15px;')) {
        content = content.replace(/\.custom-header-main-container\s*\{[\s\S]*?padding:\s*15px 15px;/, match => match.replace('padding: 15px 15px;', 'padding: 5px 15px;'));
        changed = true;
    }
    
    if (content.includes('max-height: 50px;')) {
        content = content.replace(/\.custom-header-logo img\s*\{[\s\S]*?max-height:\s*50px;/, match => match.replace('max-height: 50px;', 'max-height: 70px;'));
        changed = true;
    }
    
    if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        count++;
    }
}

console.log(`Updated header CSS for larger logo without increasing header size in ${count} files.`);

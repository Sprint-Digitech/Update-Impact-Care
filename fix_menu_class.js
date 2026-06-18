const fs = require('fs');
const path = require('path');

const htmlDir = path.join(__dirname, 'src', 'content', 'bodies');
const files = fs.readdirSync(htmlDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(htmlDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('ekit_menu_responsive_tablet')) {
        content = content.replace(/ekit_menu_responsive_tablet/g, 'ekit_menu_responsive_mobile');
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated ' + file);
    }
});

const headerPath = path.join(__dirname, 'src', 'components', 'sections', 'content', 'header.ts');
if (fs.existsSync(headerPath)) {
    let content = fs.readFileSync(headerPath, 'utf8');
    if (content.includes('ekit_menu_responsive_tablet')) {
        content = content.replace(/ekit_menu_responsive_tablet/g, 'ekit_menu_responsive_mobile');
        fs.writeFileSync(headerPath, content, 'utf8');
        console.log('Updated header.ts');
    }
}

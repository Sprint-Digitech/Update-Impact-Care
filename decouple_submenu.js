const fs = require('fs');
const path = require('path');

const bodiesDir = path.join(__dirname, 'src', 'content', 'bodies');
const filesToUpdate = fs.readdirSync(bodiesDir).filter(f => f.endsWith('.html'));

let successCount = 0;
for (const file of filesToUpdate) {
    const filePath = path.join(bodiesDir, file);
    let html = fs.readFileSync(filePath, 'utf-8');
    
    let modified = false;

    // 1. Rename the submenu classes to completely decouple them from ElementsKit
    const submenuRegex = /<ul class="elementskit-dropdown elementskit-submenu-panel">/g;
    if (submenuRegex.test(html)) {
        html = html.replace(
            submenuRegex,
            '<ul class="custom-submenu-panel" style="display: none; list-style: none; padding-left: 15px; margin: 0; background: transparent; border: none; box-shadow: none;">'
        );
        modified = true;
    }

    // 2. Update the onclick handler to directly toggle display inline without relying on external CSS
    const oldToggle = /onclick="var p = this\.nextElementSibling; if\(p\)\{p\.classList\.toggle\('show'\);\} event\.stopPropagation\(\); event\.preventDefault\(\); return false;"/g;
    if (oldToggle.test(html)) {
        html = html.replace(
            oldToggle,
            'onclick="var p = this.nextElementSibling; if(p){p.style.display = (p.style.display === \'none\' || p.style.display === \'\') ? \'block\' : \'none\';} event.stopPropagation(); event.preventDefault(); return false;"'
        );
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(filePath, html, 'utf-8');
        successCount++;
    }
}
console.log(`Updated ${successCount} files with decoupled submenus.`);

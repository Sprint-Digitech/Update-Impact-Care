const fs = require('fs');
const path = require('path');

const bodiesDir = path.join(__dirname, 'src', 'content', 'bodies');
const filesToUpdate = fs.readdirSync(bodiesDir).filter(f => f.endsWith('.html'));

let successCount = 0;
for (const file of filesToUpdate) {
    const filePath = path.join(bodiesDir, file);
    let html = fs.readFileSync(filePath, 'utf-8');
    
    let modified = false;

    // Use regex to replace the Divisions and Products toggle links
    const divRegex = /<a href="#" class="ekit-menu-nav-link ekit-menu-dropdown-toggle">Divisions<i[^>]*><\/i><\/a>/g;
    if (divRegex.test(html)) {
        html = html.replace(
            divRegex,
            `<div class="custom-dropdown-toggle" onclick="var p = this.nextElementSibling; if(p){p.classList.toggle('show');} event.stopPropagation(); event.preventDefault(); return false;" style="cursor: pointer; padding: 10px 15px; display: flex; justify-content: space-between; align-items: center; color: #333; font-weight: 500; border-bottom: 1px solid #eee;">Divisions<i aria-hidden="true" class="icon icon-down-arrow1 elementskit-submenu-indicator"></i></div>`
        );
        modified = true;
    }

    const prodRegex = /<a href="#" class="ekit-menu-nav-link ekit-menu-dropdown-toggle">Products<i[^>]*><\/i><\/a>/g;
    if (prodRegex.test(html)) {
        html = html.replace(
            prodRegex,
            `<div class="custom-dropdown-toggle" onclick="var p = this.nextElementSibling; if(p){p.classList.toggle('show');} event.stopPropagation(); event.preventDefault(); return false;" style="cursor: pointer; padding: 10px 15px; display: flex; justify-content: space-between; align-items: center; color: #333; font-weight: 500; border-bottom: 1px solid #eee;">Products<i aria-hidden="true" class="icon icon-down-arrow1 elementskit-submenu-indicator"></i></div>`
        );
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(filePath, html, 'utf-8');
        successCount++;
    }
}
console.log(`Updated ${successCount} files with decoupled inline onclick toggle.`);

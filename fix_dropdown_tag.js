const fs = require('fs');
const path = require('path');

const bodiesDir = path.join(__dirname, 'src', 'content', 'bodies');
const filesToUpdate = fs.readdirSync(bodiesDir).filter(f => f.endsWith('.html'));

let successCount = 0;
for (const file of filesToUpdate) {
    const filePath = path.join(bodiesDir, file);
    let html = fs.readFileSync(filePath, 'utf-8');
    
    let modified = false;

    // We replace the <a> tag of the dropdown toggles with a <div> to prevent ElementsKit from thinking a link was clicked
    const searchString = '<a href="#" class="ekit-menu-nav-link ekit-menu-dropdown-toggle">';
    if (html.includes(searchString)) {
        html = html.replaceAll(
            '<a href="#" class="ekit-menu-nav-link ekit-menu-dropdown-toggle">Divisions<i aria-hidden="true" class="icon icon-down-arrow1 elementskit-submenu-indicator">▼</i></a>',
            '<div class="ekit-menu-nav-link ekit-menu-dropdown-toggle" style="cursor: pointer;">Divisions<i aria-hidden="true" class="icon icon-down-arrow1 elementskit-submenu-indicator">▼</i></div>'
        );
        html = html.replaceAll(
            '<a href="#" class="ekit-menu-nav-link ekit-menu-dropdown-toggle">Products<i aria-hidden="true" class="icon icon-down-arrow1 elementskit-submenu-indicator">▼</i></a>',
            '<div class="ekit-menu-nav-link ekit-menu-dropdown-toggle" style="cursor: pointer;">Products<i aria-hidden="true" class="icon icon-down-arrow1 elementskit-submenu-indicator">▼</i></div>'
        );
        modified = true;
    }

    // Also update the JS to use stopImmediatePropagation just in case
    if (html.includes('e.stopPropagation();') && !html.includes('e.stopImmediatePropagation();')) {
        html = html.replace('e.stopPropagation();', 'e.stopPropagation();\n                e.stopImmediatePropagation();');
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(filePath, html, 'utf-8');
        successCount++;
    }
}
console.log(`Updated ${successCount} files with div toggle.`);

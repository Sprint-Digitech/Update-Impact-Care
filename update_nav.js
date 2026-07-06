const fs = require('fs');
const path = require('path');

const dir = 'src/content/bodies';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const insertString = `\n\t\t\t\t\t\t\t\t\t\t<li class="menu-item menu-item-type-post_type menu-item-object-page nav-item elementskit-mobile-builder-content"><a href="/rd/" class="ekit-menu-nav-link">R&amp;D</a></li>`;

let updatedCount = 0;

for (const f of files) {
    const filePath = path.join(dir, f);
    let html = fs.readFileSync(filePath, 'utf8');

    // The nav structure:
    // <a href="/products/" class="ekit-menu-nav-link">Products</a>\n\t\t\t\t\t\t\t\t\t\t</li>
    // Or it might be on the same line.
    
    // We can use a regex to find the end of the Products <li>
    // Look for href="/products/".*?</li>
    const regex = /(href="\/products\/".*?<\/a>\s*<\/li>)/;
    
    if (regex.test(html) && !html.includes('href="/rd/"')) {
        html = html.replace(regex, '$1' + insertString);
        fs.writeFileSync(filePath, html);
        updatedCount++;
    }
}

console.log(`Updated ${updatedCount} files with the R&D navigation link.`);

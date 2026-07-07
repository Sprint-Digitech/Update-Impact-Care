const fs = require('fs');
const path = require('path');

const dir = 'src/content/bodies';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const insertString = `\n\t\t\t\t\t\t\t\t\t\t<li class="menu-item menu-item-type-post_type menu-item-object-page nav-item elementskit-mobile-builder-content"><a href="/quality/" class="ekit-menu-nav-link">Quality</a></li>`;

let updatedCount = 0;

for (const f of files) {
    const filePath = path.join(dir, f);
    let html = fs.readFileSync(filePath, 'utf8');

    // We can use a regex to find the end of the R&D <li>
    // Look for href="/rd/".*?</li>
    const regex = /(href="\/rd\/".*?<\/a>\s*<\/li>)/;
    
    if (regex.test(html) && !html.includes('href="/quality/"')) {
        html = html.replace(regex, '$1' + insertString);
        fs.writeFileSync(filePath, html);
        updatedCount++;
    }
}

console.log(`Updated ${updatedCount} files with the Quality navigation link.`);

const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'src', 'content', 'bodies');
const files = fs.readdirSync(dirPath).filter(file => file.endsWith('.html'));

let fixCount = 0;

for (const file of files) {
    const filePath = path.join(dirPath, file);
    let html = fs.readFileSync(filePath, 'utf8');

    // Currently the file has:
    // <!-- New Custom Header --> ... </header>
    // \n\n<div data-elementor-type="wp-post" data-elementor-id="3822" ...>
    // ...
    // </div>
    // </div>
    // <div data-elementor-type="(wp-page|wp-post)" data-elementor-id="(not 3822)" ...>
    
    // We want to delete everything from '<div data-elementor-type="wp-post" data-elementor-id="3822"'
    // down to the very next '<div data-elementor-type=' (which marks the start of the body).
    // And there might be stray </div> tags right before it.
    
    const badHeaderStart = '<div data-elementor-type="wp-post" data-elementor-id="3822"';
    
    if (html.includes(badHeaderStart)) {
        const startIndex = html.indexOf(badHeaderStart);
        
        // Find the next '<div data-elementor-type=' that is NOT 3822
        // We'll search starting from after badHeaderStart
        const searchFrom = startIndex + badHeaderStart.length;
        
        let nextBlockIndex = -1;
        let regex = /<div data-elementor-type="(wp-page|wp-post)"/g;
        regex.lastIndex = searchFrom;
        
        let match;
        while ((match = regex.exec(html)) !== null) {
            // make sure it's not another 3822
            const snippet = html.substring(match.index, match.index + 100);
            if (!snippet.includes('data-elementor-id="3822"')) {
                nextBlockIndex = match.index;
                break;
            }
        }
        
        if (nextBlockIndex !== -1) {
            // Delete from startIndex up to nextBlockIndex.
            // Wait, we need to be careful not to delete any closing tags that belong to the PRELOADER or MAGIC CURSOR.
            // But startIndex is the start of the old header. nextBlockIndex is the start of the main page.
            // The stray `</div>` belonging to the ekit-wrapper is between them.
            // So if we delete everything between startIndex and nextBlockIndex, we delete the old header AND the stray </div>.
            // Are there any other elements in between?
            // "Skip to content" was BEFORE the old header. The old header is the first elementor block.
            
            // Let's delete this whole section.
            const newHtml = html.substring(0, startIndex) + html.substring(nextBlockIndex);
            
            fs.writeFileSync(filePath, newHtml, 'utf8');
            fixCount++;
        }
    }
}

console.log('Fixed ' + fixCount + ' files.');

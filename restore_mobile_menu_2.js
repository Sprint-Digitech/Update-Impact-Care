const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const bodiesDir = path.join(__dirname, 'src', 'content', 'bodies');
const origFile = path.join(bodiesDir, 'index_orig.html');

const origHtml = fs.readFileSync(origFile, 'utf-8');
const $orig = cheerio.load(origHtml);

// Find the nav menu widget wrapper which contains the mobile menu and the desktop menu
const navMenuWidget = $orig('.elementor-widget-ekit-nav-menu');
if (navMenuWidget.length === 0) {
    console.error("Could not find nav menu widget");
    process.exit(1);
}

const navMenuHtml = $orig.html(navMenuWidget);
console.log("Found nav menu widget. Length:", navMenuHtml.length);

const filesToUpdate = fs.readdirSync(bodiesDir).filter(f => f.endsWith('.html') && f !== 'index_orig.html');

let successCount = 0;
for (const file of filesToUpdate) {
    const filePath = path.join(bodiesDir, file);
    const html = fs.readFileSync(filePath, 'utf-8');
    const $file = cheerio.load(html);
    
    // Look for custom-header-wrapper
    let header = $file('.custom-header-wrapper');
    if (header.length > 0) {
        // If there's already an ekit-nav-menu widget, replace it, otherwise append
        let existingWidget = header.find('.elementor-widget-ekit-nav-menu');
        if (existingWidget.length > 0) {
            existingWidget.replaceWith(navMenuHtml);
        } else {
            // Find where to put it. Maybe replace the bare <ul>?
            let bareUl = header.find('ul#menu-header-menu');
            if (bareUl.length > 0) {
                // replace the bare <ul> with the full nav widget!
                // Wait, the nav widget includes its own wrappers.
                bareUl.replaceWith(navMenuHtml);
            } else {
                header.append(navMenuHtml);
            }
        }
        
        fs.writeFileSync(filePath, $file.html(), 'utf-8');
        successCount++;
    } else {
        // if no .custom-header-wrapper, maybe it has .ekit-template-content-header
        let ekitHeader = $file('.ekit-template-content-header');
        if (ekitHeader.length > 0) {
             let existingWidget = ekitHeader.find('.elementor-widget-ekit-nav-menu');
             if (existingWidget.length > 0) {
                 existingWidget.replaceWith(navMenuHtml);
             } else {
                 ekitHeader.append(navMenuHtml);
             }
             fs.writeFileSync(filePath, $file.html(), 'utf-8');
             successCount++;
        }
    }
}
console.log(`Updated ${successCount} files.`);

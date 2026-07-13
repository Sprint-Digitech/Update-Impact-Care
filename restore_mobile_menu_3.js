const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const bodiesDir = path.join(__dirname, 'src', 'content', 'bodies');
const origFile = path.join(bodiesDir, 'index_orig.html');

// Read the original file with utf16le since it was saved that way
const origHtml = fs.readFileSync(origFile, 'utf16le');
const $orig = cheerio.load(origHtml);

// Find the nav menu widget
const navMenuWidget = $orig('.elementor-widget-ekit-nav-menu');
if (navMenuWidget.length === 0) {
    console.error("Could not find nav menu widget");
    process.exit(1);
}

// We just want to extract the mobile toggler button and prepend it to the menu container, or replace the whole widget.
// Wait, the navMenuWidget contains both desktop and mobile menu.
const navMenuHtml = $orig.html(navMenuWidget);
console.log("Extracted nav menu length:", navMenuHtml.length);

const filesToUpdate = fs.readdirSync(bodiesDir).filter(f => f.endsWith('.html') && f !== 'index_orig.html');

let successCount = 0;
for (const file of filesToUpdate) {
    const filePath = path.join(bodiesDir, file);
    // the other files are utf-8
    const html = fs.readFileSync(filePath, 'utf-8');
    const $file = cheerio.load(html);
    
    let header = $file('.custom-header-wrapper');
    if (header.length > 0) {
        let existingWidget = header.find('.elementor-widget-ekit-nav-menu');
        if (existingWidget.length > 0) {
            existingWidget.replaceWith(navMenuHtml);
        } else {
            let bareUl = header.find('ul#menu-header-menu');
            if (bareUl.length > 0) {
                // If the header only has a bare ul, we should wrap it or replace the nearest container.
                // Usually the ul is inside a container. If we just replace the ul, we lose the container.
                // But navMenuHtml is the full widget, so it's safer to just replace the whole column containing the ul.
                bareUl.closest('.elementor-column').html(navMenuHtml);
            } else {
                header.append(navMenuHtml);
            }
        }
        
        fs.writeFileSync(filePath, $file.html(), 'utf-8');
        successCount++;
    } else {
        let ekitHeader = $file('.ekit-template-content-header');
        if (ekitHeader.length > 0) {
             let existingWidget = ekitHeader.find('.elementor-widget-ekit-nav-menu');
             if (existingWidget.length > 0) {
                 existingWidget.replaceWith(navMenuHtml);
             } else {
                 let bareUl = ekitHeader.find('ul#menu-header-menu');
                 if (bareUl.length > 0) {
                     bareUl.closest('.elementor-column').html(navMenuHtml);
                 } else {
                     ekitHeader.append(navMenuHtml);
                 }
             }
             fs.writeFileSync(filePath, $file.html(), 'utf-8');
             successCount++;
        }
    }
}
console.log(`Updated ${successCount} files.`);

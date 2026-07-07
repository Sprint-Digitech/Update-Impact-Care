const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const bodiesDir = path.join(__dirname, 'src', 'content', 'bodies');
const homeFile = path.join(bodiesDir, 'index.html');

// Read index.html
const homeHtml = fs.readFileSync(homeFile, 'utf-8');
const $home = cheerio.load('<div id="dummy-root">' + homeHtml + '</div>', { decodeEntities: false }, false);

// 1. Update Products list
const productsHtml = `
    <li class="menu-item menu-item-type-custom menu-item-object-custom nav-item elementskit-mobile-builder-content">
        <a href="/products/r-lume-suspension" class="ekit-menu-nav-link">R-LUME SUSPENSION</a>
    </li>
    <li class="menu-item menu-item-type-custom menu-item-object-custom nav-item elementskit-mobile-builder-content">
        <a href="/products/iz-500mg-tablets" class="ekit-menu-nav-link">IZ - 500mg Tablets</a>
    </li>
    <li class="menu-item menu-item-type-custom menu-item-object-custom nav-item elementskit-mobile-builder-content">
        <a href="/products/levoray-500mg-tablets" class="ekit-menu-nav-link">LEVORAY 500mg Tablets</a>
    </li>
    <li class="menu-item menu-item-type-custom menu-item-object-custom nav-item elementskit-mobile-builder-content">
        <a href="/products/fekey-syrup" class="ekit-menu-nav-link">FEKEY SYRUP</a>
    </li>
    <li class="menu-item menu-item-type-custom menu-item-object-custom nav-item elementskit-mobile-builder-content">
        <a href="/products/cipotax-tablets" class="ekit-menu-nav-link">CIPOTAX Tablets</a>
    </li>
`;
$home('#menu-footer-healthcare-menu').html(productsHtml);

// 2. Update Quick Links list
const quickLinksHtml = `
    <li class="menu-item menu-item-type-post_type menu-item-object-page nav-item elementskit-mobile-builder-content"><a href="/" class="ekit-menu-nav-link">HOME</a></li>
    <li class="menu-item menu-item-type-post_type menu-item-object-page nav-item elementskit-mobile-builder-content"><a href="/about-us/" class="ekit-menu-nav-link">ABOUT US</a></li>
    <li class="menu-item menu-item-type-post_type menu-item-object-page nav-item elementskit-mobile-builder-content"><a href="/divisions/" class="ekit-menu-nav-link">DIVISIONS</a></li>
    <li class="menu-item menu-item-type-post_type menu-item-object-page nav-item elementskit-mobile-builder-content"><a href="/products/" class="ekit-menu-nav-link">PRODUCTS</a></li>
    <li class="menu-item menu-item-type-post_type menu-item-object-page nav-item elementskit-mobile-builder-content"><a href="/rd/" class="ekit-menu-nav-link">R&D</a></li>
    <li class="menu-item menu-item-type-post_type menu-item-object-page nav-item elementskit-mobile-builder-content"><a href="/quality/" class="ekit-menu-nav-link">QUALITY</a></li>
    <li class="menu-item menu-item-type-post_type menu-item-object-page nav-item elementskit-mobile-builder-content"><a href="/manufacturing/" class="ekit-menu-nav-link">MANUFACTURING</a></li>
    <li class="menu-item menu-item-type-post_type menu-item-object-page nav-item elementskit-mobile-builder-content"><a href="/contact-us/" class="ekit-menu-nav-link">CONTACT US</a></li>
    <li class="menu-item menu-item-type-post_type menu-item-object-page nav-item elementskit-mobile-builder-content"><a href="/blog/" class="ekit-menu-nav-link">BLOG</a></li>
    <li class="menu-item menu-item-type-post_type menu-item-object-page nav-item elementskit-mobile-builder-content"><a href="/careers/" class="ekit-menu-nav-link">CAREERS</a></li>
`;
$home('#menu-footer-menu').html(quickLinksHtml);

// Also change the title from "Healthcare Menu" to "Products" if necessary?
// Actually the user didn't ask to change the title, just the products inside.

// Extract the updated footer block
const footerHtmlString = $home.html($home('.ekit-template-content-footer'));

if (!footerHtmlString) {
    console.error("Could not find footer in index.html");
    process.exit(1);
}

// 3. Sync across all files
const files = fs.readdirSync(bodiesDir);
let updatedCount = 0;

for (const file of files) {
    if (!file.endsWith('.html')) continue;
    
    const filePath = path.join(bodiesDir, file);
    
    // For index.html, we also save it since we modified its content
    if (file === 'index.html') {
        const outHtml = $home('#dummy-root').html();
        fs.writeFileSync(filePath, outHtml, 'utf-8');
        console.log(`Updated footer in ${file}`);
        updatedCount++;
        continue;
    }
    
    const html = fs.readFileSync(filePath, 'utf-8');
    const $file = cheerio.load('<div id="dummy-root">' + html + '</div>', { decodeEntities: false }, false);
    
    const targetFooter = $file('.ekit-template-content-footer');
    
    if (targetFooter.length > 0) {
        // Replace the footer
        targetFooter.replaceWith(footerHtmlString);
        
        let outHtml = $file('#dummy-root').html();
        fs.writeFileSync(filePath, outHtml, 'utf-8');
        console.log(`Updated footer in ${file}`);
        updatedCount++;
    }
}

console.log("Done. Updated footers in " + updatedCount + " files.");

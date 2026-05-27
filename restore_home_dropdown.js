const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

function getHtmlFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(getHtmlFiles(file));
        } else if (file.endsWith('.html')) {
            results.push(file);
        }
    });
    return results;
}

const htmlFiles = getHtmlFiles('src/content/bodies');

const homeDropdownHTML = `
<li id="menu-item-10341" class="menu-item menu-item-type-custom menu-item-object-custom current-menu-ancestor current-menu-parent menu-item-has-children menu-item-10341 nav-item elementskit-dropdown-has relative_position elementskit-dropdown-menu-default_width elementskit-mobile-builder-content" data-vertical-menu="750px">
<a href="#" class="ekit-menu-nav-link ekit-menu-dropdown-toggle">Home<i aria-hidden="true" class="icon icon-down-arrow1 elementskit-submenu-indicator"></i></a>
<ul class="elementskit-dropdown elementskit-submenu-panel">
    <li id="menu-item-4270" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-13 current_page_item menu-item-4270 nav-item elementskit-mobile-builder-content active" data-vertical-menu="750px"><a href="/" class=" dropdown-item active">Home - Main</a></li>
    <li id="menu-item-10328" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-10328 nav-item elementskit-mobile-builder-content" data-vertical-menu="750px"><a href="/home-image/" class=" dropdown-item">Home - Image</a></li>
    <li id="menu-item-10327" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-10327 nav-item elementskit-mobile-builder-content" data-vertical-menu="750px"><a href="/home-video/" class=" dropdown-item">Home - Video</a></li>
    <li id="menu-item-10326" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-10326 nav-item elementskit-mobile-builder-content" data-vertical-menu="750px"><a href="/home-slider/" class=" dropdown-item">Home - Slider</a></li>
</ul>
</li>
`;

let changedCount = 0;

for (const file of htmlFiles) {
    let html = fs.readFileSync(file, 'utf8');
    const $ = cheerio.load(html);
    
    let menuUl = $('#menu-header-menu');
    if (menuUl.length === 0) continue;

    // Find the current Home link
    let firstLi = menuUl.find('> li').first();
    let linkText = firstLi.find('a').first().text().trim();
    
    if (linkText === 'Home' && firstLi.find('ul').length === 0) {
        firstLi.replaceWith(homeDropdownHTML);
        fs.writeFileSync(file, $.html(), 'utf8');
        changedCount++;
        console.log("Updated " + file);
    } else if (linkText.includes('Home') && firstLi.find('ul').length > 0) {
       firstLi.replaceWith(homeDropdownHTML);
       fs.writeFileSync(file, $.html(), 'utf8');
       changedCount++;
       console.log("Refreshed " + file);
    }
}

console.log("Done! Changed " + changedCount + " files.");

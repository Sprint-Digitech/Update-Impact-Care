const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const bodiesDir = path.join(__dirname, 'src', 'content', 'bodies');
const filesToUpdate = fs.readdirSync(bodiesDir).filter(f => f.endsWith('.html'));

const divisionsDropdownHtml = `
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children nav-item elementskit-dropdown-has relative_position elementskit-dropdown-menu-default_width elementskit-mobile-builder-content" data-vertical-menu="750px">
    <div class="custom-dropdown-toggle" onclick="var p = this.nextElementSibling; if(p){p.style.display = (p.style.display === 'none' || p.style.display === '') ? 'block' : 'none';} event.stopPropagation(); event.preventDefault(); return false;" style="cursor: pointer; padding: 10px 15px; display: flex; justify-content: space-between; align-items: center; color: #333; font-weight: 500; border-bottom: 1px solid #eee;">Divisions<i aria-hidden="true" class="icon icon-down-arrow1 elementskit-submenu-indicator"></i></div>
    <ul class="custom-submenu-panel" style="display: none; list-style: none; padding-left: 15px; margin: 0; background: transparent; border: none; box-shadow: none;">
        <li class="menu-item nav-item elementskit-mobile-builder-content"><a href="/divisions/general-medicine" class=" dropdown-item">General Medicine</a></li>
        <li class="menu-item nav-item elementskit-mobile-builder-content"><a href="/divisions/cardio-diabetics" class=" dropdown-item">Cardio-Diabetics</a></li>
        <li class="menu-item nav-item elementskit-mobile-builder-content"><a href="/divisions/critical-care" class=" dropdown-item">Critical Care</a></li>
        <li class="menu-item nav-item elementskit-mobile-builder-content"><a href="/divisions/pediatrics" class=" dropdown-item">Pediatrics</a></li>
        <li class="menu-item nav-item elementskit-mobile-builder-content"><a href="/divisions/herbals" class=" dropdown-item">Herbals</a></li>
        <li class="menu-item nav-item elementskit-mobile-builder-content"><a href="/divisions/generic" class=" dropdown-item">Generic</a></li>
        <li class="menu-item nav-item elementskit-mobile-builder-content"><a href="/divisions/upcoming" class=" dropdown-item">Upcoming</a></li>
    </ul>
</li>
`;

const productsDropdownHtml = `
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children nav-item elementskit-dropdown-has relative_position elementskit-dropdown-menu-default_width elementskit-mobile-builder-content" data-vertical-menu="750px">
    <div class="custom-dropdown-toggle" onclick="var p = this.nextElementSibling; if(p){p.style.display = (p.style.display === 'none' || p.style.display === '') ? 'block' : 'none';} event.stopPropagation(); event.preventDefault(); return false;" style="cursor: pointer; padding: 10px 15px; display: flex; justify-content: space-between; align-items: center; color: #333; font-weight: 500; border-bottom: 1px solid #eee;">Products<i aria-hidden="true" class="icon icon-down-arrow1 elementskit-submenu-indicator"></i></div>
    <ul class="custom-submenu-panel" style="display: none; list-style: none; padding-left: 15px; margin: 0; background: transparent; border: none; box-shadow: none;">
        <li class="menu-item nav-item elementskit-mobile-builder-content"><a href="/products/?category=Syrups%20%26%20Suspensions" class=" dropdown-item">Syrups &amp; Suspensions</a></li>
        <li class="menu-item nav-item elementskit-mobile-builder-content"><a href="/products/?category=Tablets" class=" dropdown-item">Tablets</a></li>
        <li class="menu-item nav-item elementskit-mobile-builder-content"><a href="/products/?category=Injections" class=" dropdown-item">Injections</a></li>
        <li class="menu-item nav-item elementskit-mobile-builder-content"><a href="/products/?category=Drops" class=" dropdown-item">Drops</a></li>
        <li class="menu-item nav-item elementskit-mobile-builder-content"><a href="/products/?category=Creams%20%26%20Ointments" class=" dropdown-item">Creams &amp; Ointments</a></li>
        <li class="menu-item nav-item elementskit-mobile-builder-content"><a href="/products/?category=Capsules" class=" dropdown-item">Capsules</a></li>
    </ul>
</li>
`;

const getSimpleMenuItem = (href, text) => {
    return `
<li class="menu-item menu-item-type-post_type menu-item-object-page nav-item elementskit-mobile-builder-content">
	<a href="${href}" class="ekit-menu-nav-link">${text}</a>
</li>
`;
};

const fullMenuHtml = `
<ul id="menu-header-menu" class="elementskit-navbar-nav elementskit-menu-po-center submenu-click-on-icon">
    ${getSimpleMenuItem('/', 'Home')}
    ${getSimpleMenuItem('/about-us/', 'About Us')}
    ${divisionsDropdownHtml}
    ${productsDropdownHtml}
    ${getSimpleMenuItem('/quality/', 'Quality')}
    ${getSimpleMenuItem('/rd/', 'R&amp;D')}
    ${getSimpleMenuItem('/manufacturing/', 'Manufacturing')}
    ${getSimpleMenuItem('/image-gallery/', 'Gallery')}
    ${getSimpleMenuItem('/contact-us/', 'Contact Us')}
</ul>
`;

let successCount = 0;
for (const file of filesToUpdate) {
    const filePath = path.join(bodiesDir, file);
    const html = fs.readFileSync(filePath, 'utf-8');
    const $ = cheerio.load(html, { decodeEntities: false });
    
    let ulMenu = $('.ekit_menu_responsive_mobile ul#menu-header-menu');
    if (ulMenu.length > 0) {
        ulMenu.replaceWith(fullMenuHtml);
        fs.writeFileSync(filePath, $.html(), 'utf-8');
        successCount++;
    }
}
console.log(`Updated mobile menu in ${successCount} files.`);

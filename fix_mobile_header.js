const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const bodiesDir = path.join(__dirname, 'src', 'content', 'bodies');
const filesToUpdate = fs.readdirSync(bodiesDir).filter(f => f.endsWith('.html'));

const divisionsDropdownHtml = `
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children nav-item elementskit-dropdown-has relative_position elementskit-dropdown-menu-default_width elementskit-mobile-builder-content" data-vertical-menu="750px">
    <a href="#" class="ekit-menu-nav-link ekit-menu-dropdown-toggle">Divisions<i aria-hidden="true" class="icon icon-down-arrow1 elementskit-submenu-indicator"></i></a>
    <ul class="elementskit-dropdown elementskit-submenu-panel">
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
    <a href="#" class="ekit-menu-nav-link ekit-menu-dropdown-toggle">Products<i aria-hidden="true" class="icon icon-down-arrow1 elementskit-submenu-indicator"></i></a>
    <ul class="elementskit-dropdown elementskit-submenu-panel">
        <li class="menu-item nav-item elementskit-mobile-builder-content"><a href="/products/?category=Syrups%20%26%20Suspensions" class=" dropdown-item">Syrups &amp; Suspensions</a></li>
        <li class="menu-item nav-item elementskit-mobile-builder-content"><a href="/products/?category=Tablets" class=" dropdown-item">Tablets</a></li>
        <li class="menu-item nav-item elementskit-mobile-builder-content"><a href="/products/?category=Injections" class=" dropdown-item">Injections</a></li>
        <li class="menu-item nav-item elementskit-mobile-builder-content"><a href="/products/?category=Drops" class=" dropdown-item">Drops</a></li>
        <li class="menu-item nav-item elementskit-mobile-builder-content"><a href="/products/?category=Creams%20%26%20Ointments" class=" dropdown-item">Creams &amp; Ointments</a></li>
        <li class="menu-item nav-item elementskit-mobile-builder-content"><a href="/products/?category=Capsules" class=" dropdown-item">Capsules</a></li>
    </ul>
</li>
`;

let successCount = 0;
for (const file of filesToUpdate) {
    const filePath = path.join(bodiesDir, file);
    const html = fs.readFileSync(filePath, 'utf-8');
    const $ = cheerio.load(html);
    
    // First, find the ElementsKit nav menu (the one with the hamburger)
    let ekitNav = $('.ekit_menu_responsive_mobile');
    if (ekitNav.length > 0) {
        // Replace the flat Divisions and Products links with the dropdowns
        let divisionsLink = ekitNav.find('a[href="/divisions/"]').closest('li');
        if (divisionsLink.length > 0 && !divisionsLink.hasClass('menu-item-has-children')) {
            divisionsLink.replaceWith(divisionsDropdownHtml);
        }
        
        let productsLink = ekitNav.find('a[href="/products/"]').closest('li');
        if (productsLink.length > 0 && !productsLink.hasClass('menu-item-has-children')) {
            productsLink.replaceWith(productsDropdownHtml);
        }
        
        // Next, move the hamburger menu into .custom-header-actions
        let actionsContainer = $('.custom-header-actions');
        if (actionsContainer.length > 0) {
            // Check if it's already there
            if (actionsContainer.find('.ekit_menu_responsive_mobile').length === 0) {
                let ekitNavHtml = $.html(ekitNav); // Get HTML of the nav
                let wrapper = ekitNav.closest('.elementor-widget-ekit-nav-menu');
                
                // Add it to the actions container
                actionsContainer.append(ekitNavHtml);
                
                // Remove the old one
                if (wrapper.length > 0) {
                    wrapper.remove();
                } else {
                    ekitNav.remove();
                }
            }
        }
        
        fs.writeFileSync(filePath, $.html(), 'utf-8');
        successCount++;
    }
}
console.log(`Updated ${successCount} files.`);

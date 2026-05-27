const fs = require('fs');
const cheerio = require('cheerio');

const files = [
  'src/content/bodies/home-image.html',
  'src/content/bodies/home-video.html',
  'src/content/bodies/home-slider.html'
];

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

for (const file of files) {
  let html = fs.readFileSync(file, 'utf8');

  // 1. Logo Replacement
  const $ = cheerio.load(html);

  // Header Logo
  $('.ata-site-logo-img').attr('src', '/assets/uploads/images/Logo.png');
  // Footer Logo
  $('.wp-image-8193').attr('src', '/assets/uploads/images/Logo.png');
  // Preloader Logo
  $('#loading-icon img').attr('src', '/assets/uploads/images/Logo.png');

  // 2. Remove Clinical Icons (Thermometer, Forceps)
  $('svg path[d^="M14.5006"]').closest('.elementor-widget').remove();
  $('svg path[d^="M32.3437"]').closest('.elementor-widget').remove();

  // 3. Navigation Dropdown
  let menuUl = $('#menu-header-menu');
  if (menuUl.length > 0) {
    let firstLi = menuUl.find('> li').first();
    let linkText = firstLi.find('a').first().text().trim();
    if (linkText.includes('Home')) {
      firstLi.replaceWith(homeDropdownHTML);
    }
  }

  html = $.html();

  // 4. Update Hero Texts
  html = html.replace(/Your Health Our Priority/g, 'WHO-GMP Certified Partner');
  html = html.replace(/Expert medical care you can rely on/g, 'From Care To Cure');
  html = html.replace(/Experience healthcare you can trust\. Our dedicated team provides compassionate, high-quality care\./g, "Trusted by Patients and Medical Experts worldwide. We have strengthened our position as leaders in the Indian pharmaceutical sector, and we’ll keep our commitment to serving humanity through quality medication.  ");

  fs.writeFileSync(file, html, 'utf8');
  console.log('Restored and updated ' + file);
}

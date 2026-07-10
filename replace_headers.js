const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'src', 'content', 'bodies');
const files = fs.readdirSync(dirPath).filter(file => file.endsWith('.html'));

const newHeaderHTML = `<!-- New Custom Header -->
<style>
/* Header Top Bar */
.custom-header-top {
    background-color: #f8f9fa;
    border-bottom: 1px solid #e5e7eb;
    padding: 8px 0;
    font-size: 12px;
    color: #4b5563;
    font-family: 'Inter', sans-serif;
}
.custom-header-top-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.custom-header-top-left {
    display: flex;
    align-items: center;
    gap: 8px;
}
.custom-header-top-right {
    display: flex;
    align-items: center;
    gap: 15px;
}
.custom-header-top-link {
    color: #4b5563;
    text-decoration: none;
    transition: color 0.2s;
}
.custom-header-top-link:hover {
    color: #0d2657;
}
.custom-header-top-divider {
    color: #d1d5db;
}

/* Main Header */
.custom-header-main {
    background-color: #ffffff;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    position: sticky;
    top: 0;
    z-index: 1000;
}
.custom-header-main-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 15px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.custom-header-logo img {
    max-height: 50px;
    width: auto;
}
.custom-header-nav {
    display: flex;
    align-items: center;
    gap: 25px;
}
.custom-nav-link {
    color: #1f2937;
    text-decoration: none;
    font-weight: 700;
    font-size: 12px;
    font-family: 'Inter', sans-serif;
    text-transform: uppercase;
    position: relative;
    padding-bottom: 5px;
    transition: color 0.2s;
}
.custom-nav-link:hover {
    color: #0d2657;
}
.custom-nav-link.active {
    color: #0d2657;
}
.custom-nav-link.active::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #0d2657;
}
.custom-nav-item-has-children {
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
}
.custom-nav-item-has-children svg {
    margin-top: -2px;
}
.custom-header-actions {
    display: flex;
    align-items: center;
    gap: 20px;
}
.custom-enquire-btn {
    background-color: #0d2657;
    color: #ffffff;
    text-decoration: none;
    padding: 10px 20px;
    border-radius: 4px;
    font-weight: 600;
    font-size: 13px;
    font-family: 'Inter', sans-serif;
    transition: background-color 0.2s;
}
.custom-enquire-btn:hover {
    background-color: #0a1d42;
}
.custom-search-icon {
    color: #0d2657;
    cursor: pointer;
}
/* Ensure responsive hiding on small screens */
@media (max-width: 1024px) {
    .custom-header-top, .custom-header-nav {
        display: none;
    }
}

/* Custom Header Dropdown */
.custom-dropdown-container {
    position: relative;
}
.custom-dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    background: #ffffff;
    min-width: 200px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    border-radius: 4px;
    padding: 10px 0;
    opacity: 0;
    visibility: hidden;
    transform: translateY(10px);
    transition: all 0.3s ease;
    z-index: 1000;
}
.custom-dropdown-container:hover .custom-dropdown-menu {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}
.custom-dropdown-item {
    display: block;
    padding: 10px 20px;
    color: #4b5563;
    text-decoration: none;
    font-size: 13px;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    transition: background 0.2s, color 0.2s;
}
.custom-dropdown-item:hover {
    background: #f8f9fa;
    color: #0d2657;
}
</style>

<header class="custom-header-wrapper">
    <!-- Top Bar -->
    <div class="custom-header-top">
        <div class="custom-header-top-container">
            <div class="custom-header-top-left">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <span>Welcome to Impact Healthcare - | Global Healthcare Solutions</span>
            </div>
            <div class="custom-header-top-right">
                <a href="/blog/" class="custom-header-top-link">News & Media</a>
                <span class="custom-header-top-divider">|</span>
                <a href="/careers/" class="custom-header-top-link">Careers</a>
                <span class="custom-header-top-divider">|</span>
                <a href="#" class="custom-header-top-link">Investors</a>
                <span class="custom-header-top-divider">|</span>
                <span style="display: flex; align-items: center; gap: 4px; cursor: pointer;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                    English
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </span>
            </div>
        </div>
    </div>
    
    <!-- Main Header -->
    <div class="custom-header-main">
        <div class="custom-header-main-container">
            <a href="/" class="custom-header-logo">
                <img src="/assets/uploads/images/Logo.png" alt="Impact Healthcare">
            </a>
            <nav class="custom-header-nav">
                <a href="/" class="custom-nav-link">HOME</a>
                <a href="/about-us/" class="custom-nav-link">ABOUT US</a>
                <div class="custom-dropdown-container">
                    <a href="/divisions/" class="custom-nav-link custom-nav-item-has-children">DIVISIONS <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></a>
                    <div class="custom-dropdown-menu">
                        <a href="/divisions/#general-medicine" class="custom-dropdown-item">General Medicine</a>
                        <a href="/divisions/#cardio-diabetics" class="custom-dropdown-item">Cardio-Diabetics</a>
                        <a href="/divisions/#critical-care" class="custom-dropdown-item">Critical Care</a>
                        <a href="/divisions/#pediatrics" class="custom-dropdown-item">Pediatrics</a>
                        <a href="/divisions/#herbals" class="custom-dropdown-item">Herbals</a>
                        <a href="/divisions/#generic" class="custom-dropdown-item">Generic</a>
                        <a href="/divisions/#upcoming" class="custom-dropdown-item">Upcoming</a>
                    </div>
                </div>
                
                <div class="custom-dropdown-container">
                    <a href="/products/" class="custom-nav-link custom-nav-item-has-children">PRODUCTS <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></a>
                    <div class="custom-dropdown-menu">
                        <a href="/products/?category=Syrups%20%26%20Suspensions" class="custom-dropdown-item">Syrups & Suspensions</a>
                        <a href="/products/?category=Tablets" class="custom-dropdown-item">Tablets</a>
                        <a href="/products/?category=Injections" class="custom-dropdown-item">Injections</a>
                        <a href="/products/?category=Drops" class="custom-dropdown-item">Drops</a>
                        <a href="/products/?category=Creams%20%26%20Ointments" class="custom-dropdown-item">Creams & Ointments</a>
                        <a href="/products/?category=Capsules" class="custom-dropdown-item">Capsules</a>
                    </div>
                </div>

                <a href="/quality/" class="custom-nav-link">QUALITY</a>
                <a href="/rd/" class="custom-nav-link">R&D</a>
                <a href="/manufacturing/" class="custom-nav-link">MANUFACTURING</a>
                <a href="/gallery/" class="custom-nav-link">GALLERY</a>
                <a href="/contact-us/" class="custom-nav-link">CONTACT US</a>
            </nav>
            <div class="custom-header-actions">
                <a href="/contact-us/" class="custom-enquire-btn">ENQUIRE NOW</a>
                <svg class="custom-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
        </div>
    </div>
</header>

`;

let modifiedCount = 0;

for (const file of files) {
    const filePath = path.join(dirPath, file);
    let html = fs.readFileSync(filePath, 'utf8');

    // Handle standard elementor header structure
    const startStr1 = '<div class="ekit-template-content-markup ekit-template-content-header';
    const endStr1 = '<div data-elementor-type="wp-page"';
    const endStr2 = '<div data-elementor-type="wp-post"'; // Some files might use wp-post for the body
    
    // Also handle if we already replaced it once
    const customStart = '<!-- New Custom Header -->';
    const customEnd = '</header>';
    
    let startIndex = -1;
    let endIndex = -1;
    
    if (html.includes(customStart) && html.includes(customEnd)) {
        startIndex = html.indexOf(customStart);
        endIndex = html.indexOf(customEnd) + customEnd.length;
    } else {
        startIndex = html.indexOf(startStr1);
        if (startIndex !== -1) {
            let possibleEnd1 = html.indexOf(endStr1, startIndex);
            let possibleEnd2 = html.indexOf(endStr2, startIndex);
            
            if (possibleEnd1 !== -1 && possibleEnd2 !== -1) {
                endIndex = Math.min(possibleEnd1, possibleEnd2);
            } else if (possibleEnd1 !== -1) {
                endIndex = possibleEnd1;
            } else if (possibleEnd2 !== -1) {
                endIndex = possibleEnd2;
            }
        }
    }

    if (startIndex !== -1 && endIndex !== -1) {
        
        // Dynamically set active class
        let fileNewHeader = newHeaderHTML;
        let activeMatch = 'href="/"';
        
        if (file === 'about-us.html') activeMatch = 'href="/about-us/"';
        else if (file === 'divisions.html') activeMatch = 'href="/divisions/"';
        else if (file === 'products.html' || file.startsWith('product__')) activeMatch = 'href="/products/"';
        else if (file === 'quality.html') activeMatch = 'href="/quality/"';
        else if (file === 'rd.html') activeMatch = 'href="/rd/"';
        else if (file === 'manufacturing.html') activeMatch = 'href="/manufacturing/"';
        else if (file === 'contact-us.html') activeMatch = 'href="/contact-us/"';
        
        // Add active class to the correct nav link
        fileNewHeader = fileNewHeader.replace(new RegExp('class="custom-nav-link"\\s+' + activeMatch), 'class="custom-nav-link active" ' + activeMatch);
        fileNewHeader = fileNewHeader.replace(new RegExp('class="custom-nav-link custom-nav-item-has-children"\\s+' + activeMatch), 'class="custom-nav-link custom-nav-item-has-children active" ' + activeMatch);
        // By default HOME is active in the template. If it's not home, remove the active class from HOME
        if (file !== 'index.html' && file !== 'index_orig.html') {
             fileNewHeader = fileNewHeader.replace('class="custom-nav-link active">HOME', 'class="custom-nav-link">HOME');
        }

        const newHtml = html.substring(0, startIndex) + fileNewHeader + '\\n\\n' + html.substring(endIndex);
        fs.writeFileSync(filePath, newHtml, 'utf8');
        modifiedCount++;
    }
}

console.log('Modified ' + modifiedCount + ' files.');

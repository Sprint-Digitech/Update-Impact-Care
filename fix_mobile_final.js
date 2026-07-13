const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const bodiesDir = path.join(__dirname, 'src', 'content', 'bodies');
const filesToUpdate = fs.readdirSync(bodiesDir).filter(f => f.endsWith('.html'));

const mobileFixesHtml = `
<!-- mobileFixesHtmlV2 -->
<style>
/* Hide mobile menu on desktop to prevent breaking layout */
@media (min-width: 768px) {
    .custom-header-actions .ekit_menu_responsive_mobile {
        display: none !important;
    }
}
/* Mobile specific styles */
@media (max-width: 767px) {
    .custom-header-actions {
        display: flex;
        align-items: center;
        gap: 10px; /* smaller gap on mobile */
    }
    .custom-enquire-btn {
        padding: 6px 12px;
        font-size: 11px;
    }
    .elementskit-submenu-panel {
        display: none;
        padding-left: 15px;
        background: #f9f9f9;
    }
    .elementskit-submenu-panel.show {
        display: block !important;
    }
    .ekit-menu-dropdown-toggle {
        display: flex !important;
        justify-content: space-between !important;
        align-items: center !important;
        width: 100%;
    }
}
</style>
<script>
if (!window.mobileMenuFixed) {
    window.mobileMenuFixed = true;
    document.addEventListener('DOMContentLoaded', function() {
        // Custom toggle for mobile dropdowns
        var toggles = document.querySelectorAll('.ekit-menu-dropdown-toggle');
        toggles.forEach(function(toggle) {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                var panel = this.nextElementSibling;
                if (panel && panel.classList.contains('elementskit-submenu-panel')) {
                    panel.classList.toggle('show');
                }
            });
        });
    });
}
</script>
`;

let successCount = 0;
for (const file of filesToUpdate) {
    const filePath = path.join(bodiesDir, file);
    let html = fs.readFileSync(filePath, 'utf-8');
    
    // Clean up old injection
    if (html.includes('<!-- mobileFixesHtml -->')) {
        const regex = /<!-- mobileFixesHtml -->[\s\S]*?<\/script>/g;
        html = html.replace(regex, '');
    }

    const $ = cheerio.load(html);
    let modified = false;

    let customHeader = $('.custom-header-wrapper');
    if (customHeader.length > 0) {
        // Ensure v2 is not already there
        if (!customHeader.html().includes('mobileFixesHtmlV2')) {
            // Append it INSIDE the header so that server-parser.ts will pick it up
            customHeader.append(mobileFixesHtml);
            modified = true;
        }
    }
    
    if (modified) {
        fs.writeFileSync(filePath, $.html(), 'utf-8');
        successCount++;
    } else if (html !== fs.readFileSync(filePath, 'utf-8')) {
        fs.writeFileSync(filePath, html, 'utf-8');
    }
}
console.log(`Updated ${successCount} files by injecting into header wrapper.`);

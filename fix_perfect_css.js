const fs = require('fs');
let content = fs.readFileSync('src/styles/globals.css', 'utf8');

// Remove the old fix
const oldFixRegex = /\/\* TABLET \/ ZOOMED DESKTOP HEADER OVERLAP FIX \*\/[\s\S]*?(?=\/\*|$)/;
content = content.replace(oldFixRegex, '');

// Append the new perfect fix
const newFix = `
/* ========================================= */
/* PERFECT DESKTOP HEADER FOR 150% ZOOM      */
/* ========================================= */
@media (min-width: 768px) {
  /* Force the main row to stay on one line and align middle */
  .elementor-3822 .elementor-element-8e961d2 {
    display: flex !important;
    flex-wrap: nowrap !important;
    align-items: center !important;
    justify-content: space-between !important;
  }
  
  /* Logo */
  .elementor-3822 .elementor-element-0ce231e {
    width: auto !important;
    flex: 0 0 auto !important;
    min-width: 150px !important;
  }
  
  /* Navigation Container */
  .elementor-3822 .elementor-element-e2b5f2c {
    width: auto !important;
    flex: 1 1 auto !important;
    justify-content: center !important;
  }
  
  /* Force navigation list to stay in one line */
  .elementor-3822 .elementskit-navbar-nav {
    display: flex !important;
    flex-wrap: nowrap !important;
    justify-content: center !important;
    width: 100% !important;
  }
  
  /* Contact Button */
  .elementor-3822 .elementor-element-071fc9d {
    width: auto !important;
    flex: 0 0 auto !important;
  }
}

/* Shrink menu items specifically for zoomed screens to ensure they fit */
@media (min-width: 768px) and (max-width: 1250px) {
  .elementor-3822 .elementskit-navbar-nav > li > a {
    padding-left: 6px !important;
    padding-right: 6px !important;
    font-size: 11px !important;
    white-space: nowrap !important;
  }
  .elementor-3822 .elementor-element-071fc9d .elementor-button {
    padding: 10px 15px !important;
    font-size: 11px !important;
    white-space: nowrap !important;
  }
}
`;

fs.writeFileSync('src/styles/globals.css', content.trim() + '\n' + newFix, 'utf8');
console.log('Fixed CSS perfectly');

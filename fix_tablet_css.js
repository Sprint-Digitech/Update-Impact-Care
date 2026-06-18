const fs = require('fs');
let content = fs.readFileSync('src/styles/globals.css', 'utf8');

// Replace the hiding logic with auto-sizing logic
const hideLogic = `  /* Hide the standalone Contact Us button to make room for inline menu */
  .elementor-3822 .elementor-element-071fc9d {
    display: none !important;
  }
  
  /* Give the navigation menu the remaining space */
  .elementor-3822 .elementor-element-e2b5f2c {
    width: 80% !important;
    justify-content: flex-end !important;
  }`;

const autoSizeLogic = `  /* Let containers size automatically so they fit perfectly */
  .elementor-3822 .elementor-element-0ce231e { width: auto !important; flex: 0 0 auto !important; }
  .elementor-3822 .elementor-element-e2b5f2c { width: auto !important; flex: 1 1 auto !important; justify-content: center !important; }
  .elementor-3822 .elementor-element-071fc9d { width: auto !important; flex: 0 0 auto !important; }`;

content = content.replace(hideLogic, autoSizeLogic);

// Shrink font size slightly to fit the 150% zoom
content = content.replace('font-size: 14px !important;', 'font-size: 11px !important;\n    letter-spacing: 0px !important;\n    padding-left: 6px !important;\n    padding-right: 6px !important;');

fs.writeFileSync('src/styles/globals.css', content, 'utf8');
console.log('Fixed CSS successfully');

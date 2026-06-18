const fs = require('fs');
let content = fs.readFileSync('src/styles/globals.css', 'utf8');

const autoSizeLogic = `  /* Let containers size automatically so they fit perfectly */
  .elementor-3822 .elementor-element-0ce231e { width: auto !important; flex: 0 0 auto !important; }
  .elementor-3822 .elementor-element-e2b5f2c { width: auto !important; flex: 1 1 auto !important; justify-content: center !important; }
  .elementor-3822 .elementor-element-071fc9d { width: auto !important; flex: 0 0 auto !important; }`;

const newAutoSizeLogic = `  /* Let containers size automatically so they fit perfectly */
  .elementor-3822 .elementor-element-8e961d2 { flex-wrap: nowrap !important; }
  .elementor-3822 .elementor-element-0ce231e { width: auto !important; flex: 0 0 auto !important; }
  .elementor-3822 .elementor-element-e2b5f2c { width: auto !important; flex: 1 1 auto !important; justify-content: center !important; }
  .elementor-3822 .elementor-element-071fc9d { width: auto !important; flex: 0 0 auto !important; }`;

content = content.replace(autoSizeLogic, newAutoSizeLogic);

fs.writeFileSync('src/styles/globals.css', content, 'utf8');
console.log('Fixed wrap CSS successfully');

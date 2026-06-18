const fs = require('fs');
const css = `
/* ========================================= */
/* TABLET / ZOOMED DESKTOP HEADER OVERLAP FIX */
/* ========================================= */
@media (min-width: 768px) and (max-width: 1250px) {
  /* Hide the standalone Contact Us button to make room for inline menu */
  .elementor-3822 .elementor-element-071fc9d {
    display: none !important;
  }
  
  /* Give the navigation menu the remaining space */
  .elementor-3822 .elementor-element-e2b5f2c {
    width: 80% !important;
    justify-content: flex-end !important;
  }

  /* Reduce spacing slightly to ensure all links fit on smaller tablet screens */
  .elementor-3822 .elementskit-navbar-nav > li > a {
    padding-left: 10px !important;
    padding-right: 10px !important;
    font-size: 14px !important;
  }
}
`;
fs.appendFileSync('src/styles/globals.css', css, 'utf8');
console.log('Appended successfully');

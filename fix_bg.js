const fs = require('fs');
let content = fs.readFileSync('src/styles/globals.css', 'utf8');

const bgFix = `
/* Remove the purple background from the menu container on tablet screens */
@media (max-width: 1024px) {
    .elementor-3822 .elementor-element.elementor-element-78b1cea .elementskit-menu-container {
        background-color: transparent !important;
    }
}
`;

fs.writeFileSync('src/styles/globals.css', content.trim() + '\n' + bgFix, 'utf8');
console.log('Appended background fix successfully');

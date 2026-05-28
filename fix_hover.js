const fs = require('fs');
const filePath = 'src/styles/globals.css';
let content = fs.readFileSync(filePath, 'utf8');

const fixCSS = `
/* Invisible bridge to fix hover gap issue on dropdown */
.elementor-3822 .elementskit-navbar-nav > li.elementskit-dropdown-has {
    position: relative !important;
}
.elementor-3822 .elementskit-navbar-nav > li.elementskit-dropdown-has::after {
    content: '' !important;
    position: absolute !important;
    bottom: -25px !important;
    left: 0 !important;
    width: 100% !important;
    height: 30px !important;
    background: transparent !important;
    z-index: 99 !important;
}
`;

if (!content.includes('Invisible bridge to fix hover')) {
    content += '\n' + fixCSS;
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fix applied successfully.');
} else {
    console.log('Fix already applied.');
}

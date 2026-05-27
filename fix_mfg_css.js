const fs = require('fs');

const cssPath = 'src/styles/globals.css';
let css = fs.readFileSync(cssPath, 'utf8');

// Replace existing grid definition to include width: 100%
const updatedCss = css.replace('.mfg-grid-container {', '.mfg-grid-container {\n    width: 100%;');

fs.writeFileSync(cssPath, updatedCss, 'utf8');
console.log('Added width: 100% to .mfg-grid-container');

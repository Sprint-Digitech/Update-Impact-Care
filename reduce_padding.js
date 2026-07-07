const fs = require('fs');
const path = require('path');

const cssFile = path.join(__dirname, 'src', 'styles', 'globals.css');
let content = fs.readFileSync(cssFile, 'utf8');

// Replace margin-bottom: 100px; with margin-bottom: 50px;
content = content.replace(/margin-bottom:\s*100px;?/g, 'margin-bottom: 50px;');
content = content.replace(/margin-top:\s*100px\s*!important;?/g, 'margin-top: 50px !important;');
content = content.replace(/padding-bottom:\s*100px\s*!important;?/g, 'padding-bottom: 50px !important;');

fs.writeFileSync(cssFile, content, 'utf8');
console.log('Successfully reduced margins from 100px to 50px in globals.css');

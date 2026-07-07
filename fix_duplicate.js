const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'src', 'styles', 'globals.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

// Use a regular expression to match from the bad .mfg-awaken-strengths-container all the way to /* 2. Core Strengths
const regex = /\.mfg-awaken-strengths-container\s*\{\s*color:\s*#334155;[\s\S]*?\/\*\s*2\.\s*Core Strengths\s*\(Glassmorphism over Image Background\)\s*\*\//;

if (regex.test(cssContent)) {
    cssContent = cssContent.replace(regex, `.mfg-awaken-strengths-container {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
}

/* 2. Core Strengths (Glassmorphism over Image Background) */`);
    console.log('Removed duplicate block using regex');
    fs.writeFileSync(cssPath, cssContent, 'utf8');
} else {
    console.log('Regex did not match.');
}

const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'src', 'styles', 'globals.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

// 1. Remove the incorrectly injected duplicate block from the earlier replace
// It starts at line 3894: .mfg-awaken-strengths-container { color: #334155; line-height: 1.6; }
// all the way down to line 4071 /* 2. Core Strengths (Glassmorphism over Image Background) */
const badBlockStart = cssContent.indexOf('.mfg-awaken-strengths-container {\n    color: #334155;\n    line-height: 1.6;\n}');
const properBlockStart = cssContent.indexOf('/* 2. Core Strengths (Glassmorphism over Image Background) */', badBlockStart);

if (badBlockStart !== -1 && properBlockStart !== -1) {
    const textToReplace = cssContent.substring(badBlockStart, properBlockStart);
    // Replace the bad text with just the correct styling for .mfg-awaken-strengths-container that was overwritten
    cssContent = cssContent.replace(textToReplace, `.mfg-awaken-strengths-container {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
}

`);
    console.log('Removed duplicate block');
}

// 2. Add media queries to .mfg-glass-text at the end of the glass block
const textTarget = `.mfg-glass-text {
    font-size: 15px;
    font-weight: 500;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.9);
}`;

if (cssContent.includes(textTarget)) {
    // Only replace if media query isn't already there right after
    if (!cssContent.includes('@media (max-width: 991px) {\\n    .mfg-glass-grid')) {
        cssContent = cssContent.replace(textTarget, textTarget + `\n
@media (max-width: 991px) {
    .mfg-glass-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
    }
}

@media (max-width: 767px) {
    .mfg-glass-grid {
        grid-template-columns: 1fr;
        gap: 15px;
    }
    
    .mfg-strengths-heading {
        font-size: 32px;
        margin-bottom: 40px;
    }
}`);
        console.log('Added responsive media queries for .mfg-glass-grid');
    }
} else {
    console.log('Could not find .mfg-glass-text to append media queries');
}

fs.writeFileSync(cssPath, cssContent, 'utf8');

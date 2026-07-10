const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'content', 'bodies', 'about-us.html');
let html = fs.readFileSync(filePath, 'utf8');

let lines = html.split('\n');

// We want to remove lines 295 to 311 (0-indexed: 294 to 310)
// Let's verify line 295 is what we expect
if (lines[298].includes('elementor-button-content-wrapper') && lines[309].includes('</div>')) {
    lines.splice(294, 17); // Remove 17 lines starting from index 294
    fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
    console.log('Successfully removed lines 295-311 from about-us.html');
} else {
    console.log('Lines did not match expectations. Line 299: ' + lines[298]);
}

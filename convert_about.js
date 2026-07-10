const fs = require('fs');
const filePath = 'src/content/bodies/about-us.html';
const buffer = fs.readFileSync(filePath);

// Detect if it's UTF-16LE by checking the BOM or null bytes
let isUtf16 = false;
if (buffer[0] === 0xFF && buffer[1] === 0xFE) {
    isUtf16 = true;
} else if (buffer.indexOf(0x00) !== -1) {
    isUtf16 = true;
}

if (isUtf16) {
    const content = fs.readFileSync(filePath, 'utf16le');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Converted about-us.html from UTF-16LE to UTF-8');
} else {
    console.log('File is not UTF-16LE, ignoring.');
}

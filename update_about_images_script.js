const fs = require('fs');

const filePath = 'src/content/bodies/about-us.html';
// Read it as buffer to handle potential UTF-16LE
const buffer = fs.readFileSync(filePath);

let isUtf16 = false;
if (buffer.length >= 2 && buffer[0] === 0xFF && buffer[1] === 0xFE) {
    isUtf16 = true;
} else if (buffer.indexOf(0x00) !== -1) {
    isUtf16 = true;
}

let content = fs.readFileSync(filePath, isUtf16 ? 'utf16le' : 'utf8');

// Replace the 4 images by exact string match
content = content.replace(
    'src="/assets/uploads/2024/11/about-img-1.jpg" alt="Main Facility"',
    'src="/assets/uploads/images/about-us/about-main.jpeg" alt="Main Facility"'
);

content = content.replace(
    'src="/assets/uploads/2024/11/about-img-2.jpg" alt="Secondary Image"',
    'src="/assets/uploads/images/about-us/about-secondary.jpeg" alt="Secondary Image"'
);

content = content.replace(
    'src="/assets/uploads/2024/11/about-img-2.jpg" alt="Our Expertise"',
    'src="/assets/uploads/images/about-us/about-expertise.jpeg" alt="Our Expertise"'
);

content = content.replace(
    'src="/assets/uploads/2024/12/backup/health-item-img-2.jpg" alt="Quality Manufacturing"',
    'src="/assets/uploads/images/about-us/about-quality.jpeg" alt="Quality Manufacturing"'
);

// Save as UTF-8 so it's clean from now on
fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated images in about-us.html and ensured UTF-8 encoding.');

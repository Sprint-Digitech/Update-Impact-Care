const fs = require('fs');
const content = fs.readFileSync('src/content/bodies/products.html', 'utf8');
const lines = content.split('\n');

const startIndex = lines.findIndex(l => l.includes('Acofan Tablet') || l.includes('product__acofan-tablet'));
console.log('Product found around line:', startIndex);

if (startIndex !== -1) {
    console.log(lines.slice(Math.max(0, startIndex - 20), startIndex + 30).join('\n'));
} else {
    console.log('Acofan not found, let me search for product block');
    const h2Lines = lines.filter(l => l.includes('<h2'));
    console.log(h2Lines.slice(0, 5).join('\n'));
}

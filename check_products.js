const fs = require('fs');
const content = fs.readFileSync('src/content/bodies/products.html', 'utf8');
const occurrences = content.match(/<h2 class="elementor-heading-title elementor-size-default">/g);
console.log('Number of product headings in products.html: ' + (occurrences ? occurrences.length : 0));

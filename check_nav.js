const fs = require('fs');

// Read a sample file to see the nav structure
const html = fs.readFileSync('src/content/bodies/index.html', 'utf8');
const lines = html.split('\n');

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('/products')) {
        console.log(`Line ${i}:`, lines[i]);
        if (i + 1 < lines.length) console.log(`Line ${i+1}:`, lines[i+1]);
        if (i + 2 < lines.length) console.log(`Line ${i+2}:`, lines[i+2]);
        break; // just print the first occurrence
    }
}

const fs = require('fs');
const files = fs.readdirSync('src/content/bodies').filter(f => f.endsWith('.html'));
for (const f of files) {
    const html = fs.readFileSync('src/content/bodies/' + f, 'utf8');
    if (html.includes('/manufacturing')) {
        console.log('Found in:', f);
    }
}

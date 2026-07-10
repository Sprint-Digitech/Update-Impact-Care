const fs = require('fs');
const content = fs.readFileSync('tmp_about.html', 'utf16le');
fs.writeFileSync('tmp_about_utf8.html', content, 'utf8');
console.log('Done');

const fs = require('fs');
const files = fs.readdirSync('src/content/bodies').filter(f => f.endsWith('.html'));
files.forEach(file => {
    const html = fs.readFileSync('src/content/bodies/' + file, 'utf8');
    const hasNew = html.includes('<header class="custom-header-wrapper"');
    const hasOld = html.includes('ekit-template-content-header');
    console.log(file, 'hasNew:', hasNew, 'hasOld:', hasOld);
});

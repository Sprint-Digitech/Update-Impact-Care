const fs = require('fs');
const content = fs.readFileSync('src/content/bodies/careers.html', 'utf8');
console.log('Has page-content: ' + content.includes('<div class="page-content">'));
console.log('Has </main>: ' + content.includes('</main>'));

if (!content.includes('<div class="page-content">')) {
    const mainStart = content.indexOf('<main id="content" class="site-main">');
    if (mainStart !== -1) {
        console.log('Starts with: ' + content.substring(mainStart, mainStart + 300));
    }
}

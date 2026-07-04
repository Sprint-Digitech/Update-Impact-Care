const fs = require('fs');
let content = fs.readFileSync('src/content/bodies/index.html', 'utf8');
content = content.replace(/<div class="elementor-element elementor-element-24723b7[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, '');
fs.writeFileSync('src/content/bodies/index.html', content);
console.log('Removed duplicate About Us button!');

const fs = require('fs');
const html = fs.readFileSync('src/content/bodies/home-slider.html', 'utf8');
const titles = [...html.matchAll(/ekit_slider_title&quot;:&quot;([^&]+)&quot;/g)].map(m => m[1]);
console.log(titles);

const fs = require('fs');
const cheerio = require('cheerio');

const sourceHtml = fs.readFileSync('src/content/bodies/index.html', 'utf8');
const $source = cheerio.load(sourceHtml, { decodeEntities: false });
const correctUlHtml = $source.html($source('#menu-header-menu'));

const files = [
  'src/content/bodies/home-image.html',
  'src/content/bodies/home-video.html',
  'src/content/bodies/home-slider.html'
];

let count = 0;
for (const file of files) {
  if (fs.existsSync(file)) {
    let html = fs.readFileSync(file, 'utf8');
    const $ = cheerio.load(html, { decodeEntities: false });
    
    // Replace the old #menu-header-menu with the correct one
    $('#menu-header-menu').replaceWith(correctUlHtml);
    
    fs.writeFileSync(file, $.html(), 'utf8');
    console.log('Restored header menu in ' + file);
    count++;
  }
}
console.log('Done! Synced ' + count + ' files.');

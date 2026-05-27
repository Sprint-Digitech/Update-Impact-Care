const fs = require('fs');
const cheerio = require('cheerio');

const files = [
  'src/content/bodies/home-image.html',
  'src/content/bodies/home-video.html',
  'src/content/bodies/home-slider.html'
];

let changedCount = 0;

for (const file of files) {
  if (fs.existsSync(file)) {
    let html = fs.readFileSync(file, 'utf8');
    const $ = cheerio.load(html, { decodeEntities: false });
    
    let removed = false;
    $('h2, h3, p, div').each((i, el) => {
        const text = $(el).text();
        if (text && (text.includes('Based On 500 Reviews') || text.includes('Google Rating'))) {
            // Find the closest parent that is a flex container e-con-child
            const parentContainer = $(el).closest('.e-con-child');
            if (parentContainer.length > 0) {
                parentContainer.remove();
                removed = true;
            } else {
                // fallback
                $(el).closest('.elementor-widget').remove();
                removed = true;
            }
        }
    });

    if (removed) {
      fs.writeFileSync(file, $.html(), 'utf8');
      console.log('Removed from ' + file);
      changedCount++;
    }
  }
}
console.log('Done! Updated ' + changedCount + ' files.');

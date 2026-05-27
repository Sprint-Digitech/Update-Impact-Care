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
    
    // The .google-rating element is inside an e-con-child container.
    // Let's remove the parent container which holds the entire rating block.
    // There are two .google-rating elements per block (one for "Google Rating", one for "Based On...").
    // Removing the parent of the first one removes the whole block.
    let ratingRemoved = false;
    $('.google-rating').each((i, el) => {
       const parent = $(el).parent();
       if (parent.hasClass('e-con-child')) {
           parent.remove();
           ratingRemoved = true;
       }
    });

    if (ratingRemoved) {
      html = $.html();
      fs.writeFileSync(file, html, 'utf8');
      console.log('Removed rating block from ' + file);
      changedCount++;
    }
  }
}

// Update hero.ts using regex replace
const heroTsPath = 'src/components/sections/content/hero.ts';
if (fs.existsSync(heroTsPath)) {
  let heroTs = fs.readFileSync(heroTsPath, 'utf8');
  
  // We can use regex to remove the block that contains "Based On 500 Reviews"
  // It's the parent div of the google-rating widgets.
  // Since we know the HTML string, we can just load it into Cheerio and modify it.
  // Wait, hero.ts has the HTML wrapped in \`...\`.
  const match = heroTs.match(/export const HERO_HTML = \`([\s\S]*)\`;/);
  if (match) {
      const heroHtml = match[1];
      const $ = cheerio.load(heroHtml, { decodeEntities: false });
      
      $('.google-rating').each((i, el) => {
         const parent = $(el).parent();
         if (parent.hasClass('e-con-child')) {
             parent.remove();
         }
      });
      
      const newHeroHtml = $.html();
      const newHeroTs = heroTs.replace(match[1], newHeroHtml);
      fs.writeFileSync(heroTsPath, newHeroTs, 'utf8');
      console.log('Removed rating block from hero.ts');
      changedCount++;
  }
}

console.log('Done! Updated ' + changedCount + ' files.');

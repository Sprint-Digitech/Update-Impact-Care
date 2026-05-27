const fs = require('fs');
const cheerio = require('cheerio');

['index.html', 'home-slider.html'].forEach(f => { 
  const html = fs.readFileSync('src/content/bodies/' + f, 'utf8');
  const $ = cheerio.load(html); 
  const items = $('#menu-header-menu > li > a').map((i, el) => $(el).text().trim()).get();
  console.log(f + ' menu: ' + items.join(', ')); 
});

const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('src/content/bodies/home-slider.html', 'utf8');
const $ = cheerio.load(html);
console.log("Correct Links (from home):");
$('.ekit_social_media a').each((i, el) => {
  console.log($(el).attr('href'), $(el).find('i').attr('class'));
});

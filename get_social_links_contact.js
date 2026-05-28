const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('src/content/bodies/contact-us.html', 'utf8');
const $ = cheerio.load(html);
console.log("Contact-us Links:");
$('.ekit_social_media a').each((i, el) => {
  console.log($(el).attr('href'), $(el).find('i').attr('class'));
});

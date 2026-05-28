const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('src/content/bodies/contact-us.html', 'utf8');
const $ = cheerio.load(html);
let i = 1;
$('.ekit_social_media').each((index, el) => {
    console.log(`Widget ${index + 1}:`);
    $(el).find('a').each((_, a) => {
        console.log(`  Link ${i}: href="${$(a).attr('href')}", class="${$(a).find('i').attr('class')}"`);
        i++;
    });
});

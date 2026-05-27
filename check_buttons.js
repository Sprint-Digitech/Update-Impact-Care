const fs = require('fs');
const cheerio = require('cheerio');
const $ = cheerio.load(fs.readFileSync('src/content/bodies/home-image.html', 'utf8'));
const buttons = [];
$('.elementor-button-text').each((i, el) => buttons.push($(el).text().trim()));
console.log(buttons.slice(0, 5));

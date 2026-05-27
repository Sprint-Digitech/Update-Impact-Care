const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('src/content/bodies/home-slider.html', 'utf8');
const $ = cheerio.load(html);
$('h3.elementor-heading-title').each((i, el) => console.log('h3:', $(el).text().trim()));
$('h1.elementor-heading-title').each((i, el) => console.log('h1:', $(el).text().trim()));
$('.elementor-widget-text-editor p').each((i, el) => console.log('p:', $(el).text().trim()));

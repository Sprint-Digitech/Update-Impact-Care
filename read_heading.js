const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('src/content/bodies/home-image.html', 'utf8');
const $ = cheerio.load(html);
console.log('h3:', $('h3.elementor-heading-title').first().text().trim());
console.log('h1:', $('h1.elementor-heading-title').first().text().trim());
console.log('p:', $('.elementor-widget-text-editor p').first().text().trim());

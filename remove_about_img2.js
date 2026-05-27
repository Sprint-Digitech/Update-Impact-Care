const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path');

const targetPages = [
    'index.html',
    'home-image.html',
    'home-slider.html',
    'home-video.html',
    'about-us.html'
];

const bodiesDir = path.resolve(__dirname, 'src/content/bodies');

targetPages.forEach(file => {
    const filePath = path.join(bodiesDir, file);
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        const $ = cheerio.load(content, { decodeEntities: false });

        let changed = false;

        // Find the container by class and remove it
        const container = $('.about-img-2');
        if (container.length > 0) {
            container.remove();
            changed = true;
        }

        if (changed) {
            fs.writeFileSync(filePath, $.html(), 'utf8');
            console.log(`Deleted .about-img-2 container from ${file}`);
        }
    }
});

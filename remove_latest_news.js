const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const directoriesToScan = ['.', 'src/content/bodies'];
let updatedCount = 0;

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        // Target home page variations based on filenames
        const isHomePageVariant = (
            file.includes('index') || 
            file.startsWith('home-') || 
            file.includes('hero') ||
            file.includes('slider') ||
            file.includes('video')
        );

        if (stat.isFile() && filePath.endsWith('.html') && isHomePageVariant) {
            let content = fs.readFileSync(filePath, 'utf8');
            
            // The Latest News section container on home pages has data-id="cf3ac54"
            if (content.includes('data-id="cf3ac54"')) {
                const $ = cheerio.load('<div id="dummy-root">' + content + '</div>', { decodeEntities: false }, false);
                
                let target = $('div[data-id="cf3ac54"]');
                if (target.length > 0) {
                    target.remove();
                    let finalHtml = $('#dummy-root').html();
                    fs.writeFileSync(filePath, finalHtml, 'utf8');
                    console.log('Removed Latest News section from:', filePath);
                    updatedCount++;
                }
            }
        }
    }
}

for (const dir of directoriesToScan) {
    if (fs.existsSync(dir)) {
        processDirectory(dir);
    }
}

console.log(`Successfully removed Latest News from ${updatedCount} home page files.`);

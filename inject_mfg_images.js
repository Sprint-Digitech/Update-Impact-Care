const fs = require('fs');
const cheerio = require('cheerio');

const htmlPath = 'src/content/bodies/manufacturing.html';
const html = fs.readFileSync(htmlPath, 'utf8');
const $ = cheerio.load(html, { decodeEntities: false });

// 1. Quality Assurance Section
const qaTextEditor = $('.elementor-element-0fcec6a');
if (qaTextEditor.length > 0 && !qaTextEditor.parent().hasClass('mfg-grid-container')) {
    qaTextEditor.wrap('<div class="mfg-grid-container"></div>');
    qaTextEditor.before(`
        <div class="mfg-image-wrapper">
            <img src="/assets/uploads/images/pharma_quality_control.png" alt="Pharma Quality Control">
        </div>
    `);
}

// 2. Maintaining Quality Section
// We need to wrap both the heading and the text editor.
// Finding the heading block:
const maintainingHeading = $('h3.elementor-heading-title:contains("Maintaining Quality")').closest('.elementor-widget-heading');
const maintainingText = maintainingHeading.next('.elementor-widget-text-editor');

if (maintainingHeading.length > 0 && maintainingText.length > 0 && !maintainingHeading.parent().hasClass('mfg-grid-container')) {
    // Create a wrapper for the text side
    const textSide = $('<div class="mfg-text-wrapper"></div>');
    maintainingHeading.before(textSide);
    textSide.append(maintainingHeading);
    textSide.append(maintainingText);
    
    // Wrap the text side in the grid container
    textSide.wrap('<div class="mfg-grid-container reverse"></div>');
    textSide.before(`
        <div class="mfg-image-wrapper">
            <img src="/assets/uploads/images/pharma_production_line.png" alt="Pharma Production Line">
        </div>
    `);
}

fs.writeFileSync(htmlPath, $.html(), 'utf8');
console.log('Images added successfully to manufacturing.html');

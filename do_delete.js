const fs = require('fs');
const cheerio = require('cheerio');

// Restore from git to ensure a clean slate
const cp = require('child_process');
cp.execSync('git restore src/content/bodies/index.html');

let html = fs.readFileSync('src/content/bodies/index.html', 'utf8');
const $ = cheerio.load('<div id="dummy-root">' + html + '</div>', { decodeEntities: false }, false);

$('.elementskit-card').each(function() {
    let headerText = $(this).find('.elementskit-card-header').text().replace(/\s+/g, ' ').trim();
    
    // We want to KEEP only the first 4 numbered questions.
    let isGeneral = headerText.startsWith('1.') || 
                    headerText.startsWith('2.') || 
                    headerText.startsWith('3.') || 
                    headerText.startsWith('4.');
                    
    if (!isGeneral) {
        $(this).remove();
        console.log('Deleted FAQ:', headerText);
    } else {
        console.log('Kept FAQ:', headerText);
    }
});

let headingsToRemove = [
    'Quality & Compliance',
    'Products',
    'Business Partnerships',
    'Research & Development',
    'Customer Support',
    'Still Have Questions?'
];

$('h4, h3, h2, h5, h6, span').each(function() {
    let text = $(this).text().trim();
    for (let heading of headingsToRemove) {
        if (text.includes(heading) && text.length < heading.length + 5) {
            let parent = $(this).parent();
            let style = parent.attr('style') || '';
            if (style.includes('padding: 10px 0') || style.includes('margin-top: 40px')) {
                parent.remove();
                console.log('Removed wrapper for:', heading);
            } else {
                $(this).remove();
                console.log('Removed heading tag directly:', heading);
            }
        }
    }
});

$('*').each(function() {
    if ($(this).children().length === 0 && $(this).text().includes('info@impactcare.co.in')) {
        let parent = $(this).parent();
        let style = parent.attr('style') || '';
        if (style.includes('margin-top: 40px')) {
            parent.remove();
            console.log('Removed contact block');
        }
    }
});

let finalHtml = $('#dummy-root').html();
fs.writeFileSync('src/content/bodies/index.html', finalHtml, 'utf8');
console.log('Deletion complete.');

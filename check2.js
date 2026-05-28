const fs = require('fs');
const content = fs.readFileSync('src/content/bodies/careers.html', 'utf8');

const headerStr = 'ekit-template-content-header';
const footerStr = 'ekit-template-content-footer';

const headerIdx = content.indexOf(headerStr);
const footerIdx = content.indexOf(footerStr);

if (headerIdx !== -1 && footerIdx !== -1) {
    // find the end of the header wrapper
    // The header is wrapped in <div class="ekit-template-content-markup ekit-template-content-header ekit-template-content-theme-support">
    // then a bunch of divs. Actually, we can just replace everything between the first <div class="elementor elementor-XXXX" that contains the hero, up to the footer.
    
    // Let's just output the lines around the hero banner
    const heroIdx = content.indexOf('top-hero-banner');
    if(heroIdx !== -1) {
        console.log('Hero banner found!');
        
        // Find where the hero ends.
        let currentIndex = heroIdx;
        let depth = 0;
        let startHeroTag = content.lastIndexOf('<div', heroIdx);
        console.log('Start hero tag at: ' + startHeroTag);
    }
}

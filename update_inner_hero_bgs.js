const fs = require('fs');
const path = require('path');

// All inner pages that have a .page-header bg-section - excluding home pages
const bodiesDir = path.resolve(__dirname, 'src/content/bodies');

// Pages to SKIP (home pages - user said to skip home page)
const skipFiles = new Set([
    'index.html',
    'home-image.html',
    'home-slider.html',
    'home-video.html'
]);

const newBgUrl = '/assets/uploads/images/pharma_hero_banner_3d.png';
const oldBgUrl = '/wp-content/uploads/2025/01/page-header-bg.png';

const files = fs.readdirSync(bodiesDir).filter(f => f.endsWith('.html') && !skipFiles.has(f));

let updatedCount = 0;

files.forEach(file => {
    const filePath = path.join(bodiesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace the old page-header background image URL with our new 3D one
    if (content.includes(oldBgUrl)) {
        content = content.replaceAll(oldBgUrl, newBgUrl);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Updated: ${file}`);
        updatedCount++;
    } else {
        console.log(`⚠️  No page-header bg found in: ${file}`);
    }
});

console.log(`\n✔ Done! Updated ${updatedCount} files.`);

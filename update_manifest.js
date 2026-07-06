const fs = require('fs');

const manifestPath = 'src/content/pages-manifest.json';
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

// Check if it already exists
if (!manifest.pages.find(p => p.path === '/rd')) {
    manifest.pages.push({ path: '/rd', fileKey: 'rd' });
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    console.log("Added /rd to pages-manifest.json");
} else {
    console.log("/rd already exists in pages-manifest.json");
}

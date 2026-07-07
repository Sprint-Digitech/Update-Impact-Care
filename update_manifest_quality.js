const fs = require('fs');

const manifestPath = 'src/content/pages-manifest.json';
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

if (!manifest.pages.find(p => p.path === '/quality')) {
    manifest.pages.push({ path: '/quality', fileKey: 'quality' });
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    console.log("Added /quality to pages-manifest.json");
} else {
    console.log("/quality already exists in pages-manifest.json");
}

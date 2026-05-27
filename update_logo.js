const fs = require('fs');
const path = require('path');

const bodiesDir = path.join(__dirname, 'src', 'content', 'bodies');
const manifestPath = path.join(__dirname, 'src', 'content', 'pages-manifest.json');

// 1. Process all HTML files
const files = fs.readdirSync(bodiesDir).filter(f => f.endsWith('.html'));
for (const file of files) {
  const filePath = path.join(bodiesDir, file);
  let html = fs.readFileSync(filePath, 'utf8');
  
  // Replace the placeholder logo from previous script with the real logo
  html = html.replace(/\/wp-content\/uploads\/2024\/12\/new-logo\.png/g, '/assets/uploads/images/Logo.png');
  
  // Replace the preloader logo
  html = html.replace(/\/wp-content\/themes\/dispnsary\/assets\/images\/loader\.svg/g, '/assets/uploads/images/Logo.png');

  fs.writeFileSync(filePath, html);
}

console.log('Logo updated successfully across all headers, footers, and preloaders.');

const fs = require('fs');
const path = require('path');

const bodiesDir = path.join(__dirname, 'src', 'content', 'bodies');
const manifestPath = path.join(__dirname, 'src', 'content', 'pages-manifest.json');

// 1. Process all HTML files
const files = fs.readdirSync(bodiesDir).filter(f => f.endsWith('.html'));
for (const file of files) {
  const filePath = path.join(bodiesDir, file);
  let html = fs.readFileSync(filePath, 'utf8');
  
  // Replace header logo
  html = html.replace(/\/wp-content\/uploads\/2024\/11\/logo-1\.svg/g, '/wp-content/uploads/2024/12/new-logo.png');
  
  // Replace footer logo
  html = html.replace(/\/wp-content\/uploads\/2024\/12\/footer-logo\.svg/g, '/wp-content/uploads/2024/12/new-logo.png');

  // Let's also adjust the width and height of the footer logo to maintain aspect ratio 
  // since the new logo is likely a different aspect ratio. We can remove the hardcoded width="184" height="51"
  // from the footer logo.
  // Original footer logo tag: <img loading="lazy" width="184" height="51" src="..." ...>
  // We can use a regex to strip width and height near the new logo src.
  // Actually, we can just replace 'width="184" height="51"' with 'style="max-width: 200px; height: auto;"' 
  // but it's easier to just find the new-logo.png string and do a broader replace.
  html = html.replace(/width="184" height="51" src="\/wp-content\/uploads\/2024\/12\/new-logo\.png"/g, 'style="max-height: 80px; width: auto;" src="/wp-content/uploads/2024/12/new-logo.png"');
  html = html.replace(/width="184" height="51"\s*src="\/wp-content\/uploads\/2024\/12\/new-logo\.png"/g, 'style="max-height: 80px; width: auto;" src="/wp-content/uploads/2024/12/new-logo.png"');

  fs.writeFileSync(filePath, html);
}

console.log('Logo updated successfully.');

const fs = require('fs');
const path = require('path');

const replacements = [
  { from: /Specialist\s+Doctors/gi, to: 'Specialist Pharmacists' },
  { from: /Talk\s+to\s+our\s+48\+\s+Doctors/gi, to: 'Talk to our 48+ Pharmacists' },
  { from: /Highly\s+Qualified\s+Doctor/gi, to: 'Highly Qualified Pharmacists' },
  { from: /Doctor\s+Details/gi, to: 'Pharmacist Details' },
  { from: /We\s+ensure\s+pharmaceutical\s+care\s+through\s+highly\s+qualified\s+doctors,\s+offering\s+expertise,\s+trust,\s+and\s+personalized\s+attention\./gi, to: 'We ensure pharmaceutical care through highly qualified pharmacists, offering expertise, trust, and personalized attention.' },
  { from: />Doctors</g, to: '>Pharmacists<' },
  { from: />Doctor</g, to: '>Pharmacist<' }
];

function processFile(filepath) {
  if (!fs.existsSync(filepath)) return;
  let content = fs.readFileSync(filepath, 'utf8');
  let original = content;
  
  replacements.forEach(r => {
    content = content.replace(r.from, (match) => {
      // maintain case if possible, but simpler to just use exact target case.
      // wait, '>Doctors<' is exact case in the regex.
      return r.to;
    });
  });
  
  if (content !== original) {
    fs.writeFileSync(filepath, content);
    console.log('Updated global replacements in ' + filepath);
  }
}

function walkSync(dir) {
  let files = [];
  if (!fs.existsSync(dir)) return files;
  
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      files = files.concat(walkSync(fullPath));
    } else {
      if (fullPath.endsWith('.html') || fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
        files.push(fullPath);
      }
    }
  }
  return files;
}

const allFilesToProcess = [
  ...walkSync(path.resolve(__dirname, 'src')),
  ...walkSync(path.resolve(__dirname, 'mirror')),
  path.resolve(__dirname, 'home_slider_rendered.html'),
  path.resolve(__dirname, 'products_rendered.html'),
  path.resolve(__dirname, 'new_hero.html'),
  path.resolve(__dirname, 'old_hero.html'),
  path.resolve(__dirname, 'test_page.html')
];

allFilesToProcess.forEach(file => {
  if (file && fs.existsSync(file)) {
    processFile(file);
  }
});

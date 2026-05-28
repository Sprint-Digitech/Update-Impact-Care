const fs = require('fs');
const path = require('path');

const replacements = [
  { from: /Excellence\s+in\s+healthcare\s+is\s+our\s+standard,\s+and\s+our\s+numbers\s+back\s+it\s+up\.\s*From\s+patient\s+satisfaction\s+rates\s+to\s+successful\s+treatment\s+outcomes\./gi, to: 'Excellence in pharmaceutical manufacturing is our standard, and our numbers back it up. From product quality rates to successful distribution outcomes.' },
  { from: /Of\s+our\s+members\s+start\s+with\s+moderate\s+to\s+serve\s+symptom/gi, to: 'Of our partners report high satisfaction with our products' },
  { from: /Dr\.\s+Esther\s+Howard/gi, to: 'Esther Howard' },
  { from: /Ophthalmology/gi, to: 'Quality Control' },
  { from: /Dr\.\s+Jenny\s+Wilson/gi, to: 'Jenny Wilson' },
  { from: /Anesthesiology/gi, to: 'Research & Development' },
  { from: /Dr\.\s+Kristin\s+Watson/gi, to: 'Kristin Watson' },
  { from: /Infectious\s+Disease/gi, to: 'Supply Chain Manager' },
  { from: /Dr\.\s+Arlene\s+Mccoy/gi, to: 'Arlene Mccoy' },
  { from: /Cardiology/gi, to: 'Production Lead' },
  { from: /Dr\.\s+James\s+Smith/gi, to: 'James Smith' },
  { from: /Dr\.\s+Sarah\s+Lee/gi, to: 'Sarah Lee' },
  { from: /Dr\.\s+Michael\s+Johnson/gi, to: 'Michael Johnson' },
  { from: /Dr\.\s+Rachel\s+Davis/gi, to: 'Rachel Davis' },
  // just in case "moderate to severe symptom"
  { from: /Of\s+our\s+members\s+start\s+with\s+moderate\s+to\s+severe\s+symptom/gi, to: 'Of our partners report high satisfaction with our products' },
  { from: /Dr\.\s+/gi, to: '' }
];

function processFile(filepath) {
  if (!fs.existsSync(filepath)) return;
  let content = fs.readFileSync(filepath, 'utf8');
  let original = content;
  
  replacements.forEach(r => {
    content = content.replace(r.from, (match) => {
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

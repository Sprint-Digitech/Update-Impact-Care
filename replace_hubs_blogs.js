const fs = require('fs');
const path = require('path');

const replacements = [
  // Hubs
  { from: /Esther\s+Howard/gi, to: 'West Africa Hub' },
  { from: /Quality\s+Control/gi, to: "Burkina Faso, Côte d'Ivoire, Senegal, Togo, Benin, Guinea, Mali, Niger, Gabon" },
  { from: /Jenny\s+Wilson/gi, to: 'Southeast Asia Hub' },
  { from: /Research\s+&\s+Development/gi, to: 'Vietnam, Myanmar, Cambodia' },
  { from: /Kristin\s+Watson/gi, to: 'Middle East Operations' },
  { from: /Supply\s+Chain\s+Manager/gi, to: 'Oman and regional partners' },
  { from: /Arlene\s+Mccoy/gi, to: 'European Logistics' },
  { from: /Production\s+Lead/gi, to: 'Strategic partnerships & distribution, Belgium' },

  // Blogs
  { from: /Research\s+Breakthrough\s+in\s+Heart\s+Disease\s+Treatment/gi, to: 'New Quality Standards in Pharmaceutical Manufacturing' },
  { from: /Advanced\s+Medical\s+Solutions\s+for\s+Every\s+Patient(?:'|\\&\\#8217\\;)?s\s+Needs/gi, to: 'Global Supply Chain Strategies for Bulk Distribution' },
  { from: /Your\s+Trusted\s+Partner\s+in\s+Comprehensive\s+Medical\s+Care/gi, to: 'Streamlining Production for Generic Medicines' }
];

function processFile(filepath) {
  if (!fs.existsSync(filepath)) return;
  let content = fs.readFileSync(filepath, 'utf8');
  let original = content;
  
  replacements.forEach(r => {
    content = content.replace(r.from, r.to);
  });
  
  if (content !== original) {
    fs.writeFileSync(filepath, content);
    console.log('Updated ' + filepath);
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
  ...walkSync(path.resolve(__dirname, 'mirror'))
];

allFilesToProcess.forEach(file => {
  if (file && fs.existsSync(file)) {
    processFile(file);
  }
});

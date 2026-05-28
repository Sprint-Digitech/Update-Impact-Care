const fs = require('fs');
const path = require('path');

const replacements = [
  { from: /Why\s+patients\s+trust\s+us\s+with\s+their\s+care/gi, to: 'Why customers trust our medicines' },
  { from: /Our\s+commitment\s+to\s+excellence,\s+compassion,\s+and\s+personalized\s+treatment\s+has\s+earned\s+the\s+trust\s+of\s+countless\s+patients\.\s*Discover\s+what\s+sets\s+our\s+care\s+apart\./gi, to: 'Our commitment to excellence, quality, and rigorous testing has earned the trust of countless clients. Discover what sets our medicines apart.' },
  { from: /We\s+offer\s+flexible\s+hours\s+to\s+fit\s+your\s+busy\s+schedule\./gi, to: 'We offer flexible supply chains to fit your schedule.' },
  { from: /Team\s+is\s+committed\s+to\s+making\s+you\s+feel\s+comfortable\./gi, to: 'Team is committed to providing top-quality pharmaceutical products.' },
  { from: /We\s+ensure\s+you\s+receive\s+prompt\s+and\s+effective\s+care\./gi, to: 'We ensure you receive prompt and effective deliveries.' },
  { from: /Helping\s+you\s+manage\s+your\s+health\s+at\s+every\s+stage\s+of\s+life\./gi, to: 'Providing reliable medical products for every need.' },
  
  { from: /50\+\s+Expert\s+Doctor/gi, to: '50+ Expert Pharmacists' },
  { from: /Our\s+team\s+includes\s+over\s+50\s+highly\s+skilled\s+doctors\./gi, to: 'Our team includes over 50 highly skilled pharmacists and researchers.' },
  { from: /Expert\s+Medical\s+Team/gi, to: 'Expert Research Team' },
  
  { from: /We\s+work\s+to\s+achieve\s+better\s+health\s+outcomes/gi, to: 'We work to manufacture better medicines' },
  { from: /We\s+are\s+committed\s+to\s+improving\s+health\s+outcomes\s+through\s+personalized\s+care,\s+innovative\s+treatments,\s+and\s+a\s+focus\s+on\s+prevention\./gi, to: 'We are committed to improving healthcare through quality manufacturing, innovative formulas, and a focus on reliability.' },
  
  { from: /Search\s+Doctor/gi, to: 'Search Products' },
  { from: /Schedule\s+Appointment/gi, to: 'Place Order' },
  { from: /Start\s+Consultation/gi, to: 'Track Delivery' },
  { from: /Join\s+our\s+community\s+by\s+creating\s+an\s+account\s+today\./gi, to: 'Join our network of trusted pharmaceutical partners today.' },
  
  { from: /Team\s+Members/gi, to: 'Our Expertise' },
  { from: /Compassionate\s+experts\s+you\s+can\s+trust/gi, to: 'Quality medicine you can trust' },
  { from: /Our\s+team\s+brings\s+together\s+a\s+wealth\s+of\s+experience,\s+passion,\s+and\s+a\s+dedication\s+to\s+excellence\s+in\s+patient\s+care\./gi, to: 'Our team brings together a wealth of experience, precision, and a dedication to excellence in pharmaceutical production.' },
  { from: /View\s+All\s+Services/gi, to: 'View All Products' },
  { from: /better\s+health\s+outcomes/gi, to: 'better medical outcomes' },
  { from: /health\s+outcomes/gi, to: 'medical outcomes' },
  { from: /patient\s+care/gi, to: 'pharmaceutical care' },
  { from: /countless\s+patients/gi, to: 'countless clients' }
];

function processFile(filepath) {
  if (!fs.existsSync(filepath)) return;
  let content = fs.readFileSync(filepath, 'utf8');
  let original = content;
  
  replacements.forEach(r => {
    content = content.replace(r.from, (match) => {
      // replace entirely
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

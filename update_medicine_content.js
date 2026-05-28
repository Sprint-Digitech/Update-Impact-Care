const fs = require('fs');
const path = require('path');

const dirs = ['src/content/bodies', 'mirror/html'];
const rootFiles = ['home_slider_rendered.html', 'products_rendered.html', 'new_hero.html', 'old_hero.html', 'test_page.html'];

const replacements = [
  { from: /Why patients trust us with their care/g, to: 'Why customers trust our medicines' },
  { from: /Our commitment to excellence, compassion, and personalized treatment has earned the trust of countless patients\. Discover what sets our care apart\./g, to: 'Our commitment to excellence, quality, and rigorous testing has earned the trust of countless clients. Discover what sets our medicines apart.' },
  { from: /Our commitment to excellence, compassion, and personalized treatment has earned the trust of countless patients\. Discover what sets our care apart\. Discover what sets our care apart\./g, to: 'Our commitment to excellence, quality, and rigorous testing has earned the trust of countless clients. Discover what sets our medicines apart.' },
  { from: /We offer flexible hours to fit your busy schedule\./g, to: 'We offer flexible supply chains to fit your schedule.' },
  { from: /Team is committed to making you feel comfortable\./g, to: 'Team is committed to providing top-quality pharmaceutical products.' },
  { from: /We ensure you receive prompt and effective care\./g, to: 'We ensure you receive prompt and effective deliveries.' },
  { from: /Helping you manage your health at every stage of life\./g, to: 'Providing reliable medical products for every need.' },
  
  { from: /50\+ Expert Doctor/g, to: '50+ Expert Pharmacists' },
  { from: /Our team includes over 50 highly skilled doctors\./g, to: 'Our team includes over 50 highly skilled pharmacists and researchers.' },
  { from: /Expert Medical Team/g, to: 'Expert Research Team' },
  
  { from: /We work to achieve better health outcomes/g, to: 'We work to manufacture better medicines' },
  { from: /We are committed to improving health outcomes through personalized care,\s*innovative treatments, and a focus on prevention\./g, to: 'We are committed to improving healthcare through quality manufacturing, innovative formulas, and a focus on reliability.' },
  
  { from: /Search Doctor/g, to: 'Search Products' },
  { from: /Schedule Appointment/g, to: 'Place Order' },
  { from: /Start Consultation/g, to: 'Track Delivery' },
  { from: /Join our community by creating an account today\./g, to: 'Join our network of trusted pharmaceutical partners today.' },
  
  { from: /Team Members/g, to: 'Our Expertise' },
  { from: /Compassionate experts you can trust/g, to: 'Quality medicine you can trust' },
  { from: /Our team brings together a wealth of experience, passion, and a dedication to\s*excellence in patient care\./g, to: 'Our team brings together a wealth of experience, precision, and a dedication to excellence in pharmaceutical production.' }
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
    console.log('Updated content in ' + filepath);
  }
}

dirs.forEach(dir => {
  const dirPath = path.resolve(__dirname, dir);
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach(file => {
      if (file.endsWith('.html')) {
        processFile(path.join(dirPath, file));
      }
    });
  }
});

rootFiles.forEach(file => {
  processFile(path.resolve(__dirname, file));
});

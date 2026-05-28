const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'src/content/bodies/home-image.html',
  'src/content/bodies/home-slider.html',
  'src/content/bodies/home-video.html',
  'src/content/bodies/index.html',
  'mirror/html/home-image.html',
  'mirror/html/home-slider.html',
  'mirror/html/home-video.html',
  'mirror/html/index.html',
  'home_slider_rendered.html',
  'products_rendered.html',
  'new_hero.html',
  'old_hero.html'
];

filesToUpdate.forEach(file => {
  const filepath = path.resolve(__dirname, file);
  if (!fs.existsSync(filepath)) return;
  
  let content = fs.readFileSync(filepath, 'utf8');
  let original = content;
  
  // Replace View All Services regardless of whitespace
  content = content.replace(/View\s+All\s+Services/gi, 'View All Products');
  
  if (content !== original) {
    fs.writeFileSync(filepath, content);
    console.log('Updated View All Services in ' + file);
  }
});

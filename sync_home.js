const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path');

function syncPages() {
  const indexHtml = fs.readFileSync('src/content/bodies/index.html', 'utf8');
  const $index = cheerio.load(indexHtml, null, false);
  
  // Find the main wrapper in index.html
  const indexMain = $index('.elementor-13').length ? $index('.elementor-13') : $index('.elementor').first();
  console.log('Index wrapper class: ' + indexMain.attr('class'));
  
  // Extract all children except the first one (which is the hero)
  const lowerContent = [];
  indexMain.children().each((i, el) => {
    if (i > 0) {
      lowerContent.push($index.html(el));
    }
  });
  console.log('Index lowerContent items: ' + lowerContent.length);
  
  const targetFiles = [
    { file: 'home-image.html', selector: '.elementor-10168' },
    { file: 'home-video.html', selector: '.elementor-10178' },
    { file: 'home-slider.html', selector: '.elementor-10180' }
  ];
  
  const dirs = ['src/content/bodies', 'mirror/html'];
  
  dirs.forEach(dir => {
    targetFiles.forEach(target => {
      const filepath = path.join(dir, target.file);
      if (!fs.existsSync(filepath)) return;
      
      let html = fs.readFileSync(filepath, 'utf8');
      const $ = cheerio.load(html, null, false);
      
      let mainWrapper = $(target.selector);
      if (mainWrapper.length === 0) {
        // Fallback
        mainWrapper = $('.elementor').first();
      }
      
      console.log(filepath + ' wrapper class: ' + mainWrapper.attr('class'));
      
      // Keep only the first child
      const firstChild = mainWrapper.children().first().clone();
      
      mainWrapper.empty();
      mainWrapper.append(firstChild);
      
      // Append lower content from index
      lowerContent.forEach(content => {
        mainWrapper.append(content);
      });
      
      fs.writeFileSync(filepath, $.html());
      console.log('Synced ' + filepath);
    });
  });
}

syncPages();

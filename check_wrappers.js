const fs = require('fs');
const cheerio = require('cheerio');

function checkFile(file) {
  const content = fs.readFileSync('src/content/bodies/' + file, 'utf8');
  const $ = cheerio.load(content);
  // Find the elementor div that wraps everything
  const wrapper = $('.elementor').first();
  console.log(file + ' wrapper class: ' + wrapper.attr('class'));
  console.log(file + ' direct children count: ' + wrapper.children().length);
}

['index.html', 'home-image.html', 'home-video.html', 'home-slider.html'].forEach(checkFile);

const fs = require('fs');
const path = require('path');

function searchFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(searchFiles(filePath));
    } else if (file.endsWith('.html') || file.endsWith('.ts')) {
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n');
      lines.forEach((line, index) => {
        if (/doctor/i.test(line) && !/class=\"[^\"]*doctor/i.test(line) && !/src=\"[^\"]*doctor/i.test(line) && !/href=\"[^\"]*doctor/i.test(line) && !/id=\"[^\"]*doctor/i.test(line)) {
          results.push(filePath + ':' + (index+1) + ': ' + line.trim());
        }
      });
    }
  });
  return results;
}

const res1 = searchFiles('src');
const res2 = searchFiles('mirror');
const rootFiles = ['home_slider_rendered.html', 'new_hero.html', 'old_hero.html', 'test_page.html'];
let res3 = [];
rootFiles.forEach(file => {
  if(fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8');
      const lines = content.split('\n');
      lines.forEach((line, index) => {
        if (/doctor/i.test(line) && !/class=\"[^\"]*doctor/i.test(line) && !/src=\"[^\"]*doctor/i.test(line) && !/href=\"[^\"]*doctor/i.test(line) && !/id=\"[^\"]*doctor/i.test(line)) {
          res3.push(file + ':' + (index+1) + ': ' + line.trim());
        }
      });
  }
});

const allRes = [...res1, ...res2, ...res3];
fs.writeFileSync('doctor_search_results.txt', allRes.join('\n'));
console.log('Found ' + allRes.length + ' visible doctor references. Wrote to doctor_search_results.txt');

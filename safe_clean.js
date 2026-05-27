const fs = require('fs');
const path = require('path');
const dir = 'src/content/bodies';
let count = 0;
fs.readdirSync(dir).filter(f => f.endsWith('.html')).forEach(f => {
  const p = path.join(dir, f);
  let c = fs.readFileSync(p, 'utf8');
  const orig = c;
  
  c = c.replace(/<\/?html\b[^>]*>/gi, '');
  c = c.replace(/<head\b[^>]*>/gi, '');
  c = c.replace(/<\/head>/gi, '');
  c = c.replace(/<body\b[^>]*>/gi, '');
  c = c.replace(/<\/body>/gi, '');
  
  if (c !== orig) {
    fs.writeFileSync(p, c.trim());
    count++;
  }
});
console.log('Cleaned ' + count + ' files.');

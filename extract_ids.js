const fs = require('fs');
const html = fs.readFileSync('old_index.html', 'utf8');
const ids = [...html.matchAll(/data-elementor-id="(\d+)"/g)].map(x => x[1]);
console.log([...new Set(ids)]);

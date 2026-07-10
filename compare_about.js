const fs = require('fs');

const temp2 = fs.readFileSync('temp2.html', 'utf8');
const current = fs.readFileSync('src/content/bodies/about-us.html', 'utf8');

console.log('temp2 length:', temp2.length);
console.log('current length:', current.length);

const t2_page = temp2.indexOf('data-elementor-type="wp-page"');
const c_page = current.indexOf('data-elementor-type="wp-page"');

console.log('temp2 wp-page index:', t2_page);
console.log('current wp-page index:', c_page);

const t2_sub = temp2.substring(t2_page, t2_page + 200);
const c_sub = current.substring(c_page, c_page + 200);

console.log('temp2 content preview:', t2_sub);
console.log('current content preview:', c_sub);

// Let's also check for "Legacy of Healing" in temp2
console.log('temp2 has Legacy:', temp2.includes('Legacy of'));
console.log('current has Legacy:', current.includes('Legacy of'));

const fs = require('fs');
let content = fs.readFileSync('src/content/bodies/index.html', 'utf8');

// The background image style on 01bbc35
const bgStyle = ackground-image: linear-gradient(rgba(0, 25, 55, 0.65), rgba(0, 25, 55, 0.75)), url('/assets/images/hero-building.jpeg'); background-size: cover; background-position: center; background-repeat: no-repeat;;

// 1. Remove bg style from 01bbc35
content = content.replace(
  'style="' + bgStyle + ' border-radius: 0 !important;"',
  'style="border-radius: 0 !important;"'
);
content = content.replace(
  'data-settings="{&quot;background_background&quot;:&quot;classic&quot;,&quot;background_image&quot;:{&quot;url&quot;:&quot;\\\/assets\\\/images\\\/hero-building.jpeg&quot;}}"',
  'data-settings="{&quot;background_background&quot;:&quot;classic&quot;}"'
);

// 2. Add bg style to bef7d76
content = content.replace(
  'data-settings="{&quot;background_background&quot;:&quot;classic&quot;}" style="border-radius: 0 !important;"',
  'data-settings="{&quot;background_background&quot;:&quot;classic&quot;,&quot;background_image&quot;:{&quot;url&quot;:&quot;\\\/assets\\\/images\\\/hero-building.jpeg&quot;}}" style="' + bgStyle + ' border-radius: 0 !important;"'
);

fs.writeFileSync('src/content/bodies/index.html', content);
console.log('Moved background to bef7d76 successfully!');

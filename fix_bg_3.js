const fs = require('fs');
let content = fs.readFileSync('src/content/bodies/index.html', 'utf8');

// The background image style on 01bbc35
const bgStyle = ackground-image: linear-gradient(rgba(0, 25, 55, 0.65), rgba(0, 25, 55, 0.75)), url('/assets/images/hero-building.jpeg'); background-size: cover; background-position: center; background-repeat: no-repeat;;

// Find 01bbc35 and remove its background style and data-settings
content = content.replace(
  /elementor-element-01bbc35 bg-section e-flex e-con-full e-con e-child" data-id="01bbc35" data-element_type="container" data-e-type="container" data-settings="\{&quot;background_background&quot;:&quot;classic&quot;\}" style="background-image: [^"]+; border-radius: 0 !important;"/g,
  'elementor-element-01bbc35 bg-section e-flex e-con-full e-con e-child" data-id="01bbc35" data-element_type="container" data-e-type="container" style="border-radius: 0 !important;"'
);

// Add the background style and data-settings to bef7d76
content = content.replace(
  /elementor-element-bef7d76 top-hero-banner e-flex e-con-full e-con e-parent" data-id="bef7d76" data-element_type="container" data-e-type="container" data-settings="\{&quot;background_background&quot;:&quot;classic&quot;\}" style="border-radius: 0 !important;"/g,
  'elementor-element-bef7d76 top-hero-banner e-flex e-con-full e-con e-parent" data-id="bef7d76" data-element_type="container" data-e-type="container" data-settings="{&quot;background_background&quot;:&quot;classic&quot;,&quot;background_image&quot;:{&quot;url&quot;:&quot;\\\/assets\\\/images\\\/hero-building.jpeg&quot;}}" style="' + bgStyle + ' border-radius: 0 !important;"'
);

fs.writeFileSync('src/content/bodies/index.html', content);
console.log('Fixed BG successfully!');

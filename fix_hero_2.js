const fs = require('fs');
let content = fs.readFileSync('src/content/bodies/index.html', 'utf8');

// Remove top-hero-banner if it was added
content = content.replace(
  'elementor-element-bef7d76 top-hero-banner',
  'elementor-element-bef7d76'
);

// Ensure bef7d76 is e-con-full
content = content.replace(
  'elementor-element-bef7d76 e-flex e-con-boxed',
  'elementor-element-bef7d76 e-flex e-con-full'
);
content = content.replace(
  'elementor-element-bef7d76 e-flex e-con-full',
  'elementor-element-bef7d76 e-flex e-con-full' // just in case
);

// Ensure 01bbc35 is e-con-full
content = content.replace(
  'elementor-element-01bbc35 bg-section e-flex e-con-boxed',
  'elementor-element-01bbc35 bg-section e-flex e-con-full'
);

// Add border-radius: 0 to bef7d76 inline just to be safe
content = content.replace(
  'data-settings="{&quot;background_background&quot;:&quot;classic&quot;}"',
  'data-settings="{&quot;background_background&quot;:&quot;classic&quot;}" style="border-radius: 0 !important;"'
);

// Add border-radius: 0 to 01bbc35 inline
content = content.replace(
  'url(\'/assets/images/hero-building.jpeg\'); background-size: cover; background-position: center; background-repeat: no-repeat;"',
  'url(\'/assets/images/hero-building.jpeg\'); background-size: cover; background-position: center; background-repeat: no-repeat; border-radius: 0 !important;"'
);

// Ensure left alignment for inner content
content = content.replace(
  'justify-content: flex-start; padding-left: 20px !important; margin-left: 0 !important; max-width: 100% !important;',
  'justify-content: flex-start; padding-left: 20px !important; margin-left: 0 !important; max-width: 100% !important;'
);

fs.writeFileSync('src/content/bodies/index.html', content);
console.log('Fixed edge layout safely!');

const fs = require('fs');
let content = fs.readFileSync('src/content/bodies/index.html', 'utf8');

// Ensure bef7d76 has top-hero-banner
content = content.replace(
  'elementor-element-bef7d76 e-flex e-con-full',
  'elementor-element-bef7d76 top-hero-banner e-flex e-con-full'
);
content = content.replace(
  'elementor-element-bef7d76 e-flex e-con-boxed',
  'elementor-element-bef7d76 top-hero-banner e-flex e-con-full'
);

// We need to also add style="border-radius: 0 !important;" to bef7d76 if it doesn't have it
if (!content.includes('data-settings="{&quot;background_background&quot;:&quot;classic&quot;}" style="border-radius: 0 !important;"')) {
    content = content.replace(
      'data-settings="{&quot;background_background&quot;:&quot;classic&quot;}"',
      'data-settings="{&quot;background_background&quot;:&quot;classic&quot;}" style="border-radius: 0 !important;"'
    );
}

fs.writeFileSync('src/content/bodies/index.html', content);
console.log('Applied top-hero-banner successfully!');

const fs = require('fs');
let content = fs.readFileSync('src/content/bodies/index.html', 'utf8');

// 1. Remove the entire star rating container
content = content.replace(/<div class="elementor-element elementor-element-fe4bcf9[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/g, '');

// 2. Add 'top-hero-banner' class to bef7d76 to get edge-to-edge, and inline border-radius 0
content = content.replace(
  'elementor-element-bef7d76 e-flex e-con-full e-con e-parent"',
  'elementor-element-bef7d76 top-hero-banner e-flex e-con-full e-con e-parent" style="border-radius: 0 !important;"'
);

// 3. Update the H1 to exactly 2 lines with white-space: nowrap
content = content.replace(
  '<h1 class="elementor-heading-title elementor-size-default" style="font-size: clamp(36px, 5vw, 64px); font-weight: 800; color: #ffffff; line-height: 1.2; margin-bottom: 10px; font-family: \'Outfit\', sans-serif; text-shadow: 0 4px 20px rgba(0,0,0,0.3);">Delivering Quality Medicines<br><span style="color: #4ade80;">Improving Global Lives</span></h1>',
  '<h1 class="elementor-heading-title elementor-size-default" style="font-size: clamp(36px, 5vw, 64px); font-weight: 800; color: #ffffff; line-height: 1.2; margin-bottom: 10px; font-family: \'Outfit\', sans-serif; text-shadow: 0 4px 20px rgba(0,0,0,0.3); white-space: nowrap !important; text-align: left !important; width: 100%;">Delivering Quality Medicines<br>Improving Global Lives</h1>'
);

// 4. Update the P tag alignment to left
content = content.replace(
  '<p style="font-size: 18px; color: #f0f0f0; line-height: 1.6; max-width: 700px; font-family: \'Inter\', sans-serif; background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(10px); padding: 15px 25px; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1);">A research-driven pharmaceutical company',
  '<p style="font-size: 18px; color: #f0f0f0; line-height: 1.6; max-width: 700px; font-family: \'Inter\', sans-serif; background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(10px); padding: 15px 25px; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1); text-align: left !important; margin-left: 0;">A research-driven pharmaceutical company'
);

// 5. Update the button colors to orange-red (#ff564c)
content = content.replace(
  'background-color: #4ade80; color: #001937;',
  'background-color: #ff564c !important; color: #ffffff !important;'
);

// Force alignment to left on containers
content = content.replace(
  'style="display: flex; gap: 15px; flex-wrap: wrap;"',
  'style="display: flex; gap: 15px; flex-wrap: wrap; justify-content: flex-start !important; width: 100%; margin-left: 0; padding-left: 0;"'
);

fs.writeFileSync('src/content/bodies/index.html', content);
console.log('Fixes applied successfully!');

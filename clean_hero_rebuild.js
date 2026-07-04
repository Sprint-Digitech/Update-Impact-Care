const fs = require('fs');
let content = fs.readFileSync('src/content/bodies/index.html', 'utf8');

// 1. Remove the `<video>` block. It is within `<div class="elementor-background-video-container">...</div>`
content = content.replace(/<div class="elementor-background-video-container">[\s\S]*?<\/video>\s*<\/div>/g, '');

// 2. Change the data-settings and add the background image with gradient to the main wrapper
// The original starts with `<div data-elementor-type="wp-page" data-elementor-id="13" class="elementor elementor-13">`
// Then the section is `<section class="elementor-section ... elementor-background-video-hosted"`
// Let's replace the whole data-settings for the video section
const oldDataSettings = `data-settings="{&quot;background_background&quot;:&quot;video&quot;,&quot;background_video_link&quot;:&quot;https:\\\/\\\/demo.awaikenthemes.com\\\/assets\\\/videos\\\/dispnsary-video.mp4&quot;,&quot;background_play_on_mobile&quot;:&quot;yes&quot;}"`;
const bgStyle = `style="background-image: linear-gradient(rgba(0, 25, 55, 0.65), rgba(0, 25, 55, 0.75)), url('/assets/images/hero-building.jpeg'); background-size: cover; background-position: center; background-repeat: no-repeat;"`;
content = content.replace(oldDataSettings, `data-settings="{&quot;background_background&quot;:&quot;classic&quot;,&quot;background_image&quot;:{&quot;url&quot;:&quot;\\/assets\\/images\\/hero-building.jpeg&quot;}}" ${bgStyle}`);

// 3. Replace the heading
content = content.replace(
  'From Care To Cure',
  'Delivering Quality Medicines<br><span style="color: #4ade80;">Improving Global Lives</span>'
);

// 4. Replace the paragraph text
const oldParagraph = 'Trusted by Patients and Medical Experts worldwide. We have strengthened our\\s*position as leaders in the Indian pharmaceutical sector, and we’ll keep our\\s*commitment to serving humanity through quality medication.';
const newParagraph = 'A research-driven pharmaceutical company delivering high-quality, affordable medicines trusted in over 50+ countries worldwide.';
content = content.replace(new RegExp(oldParagraph, 'g'), newParagraph);

// 5. Add custom CSS styles for the typography directly to the H1 and P tags
// We can just find the H1 and inject styles
content = content.replace(
  '<h1 class="elementor-heading-title elementor-size-default">',
  '<h1 class="elementor-heading-title elementor-size-default" style="font-size: clamp(36px, 5vw, 64px); font-weight: 800; color: #ffffff; line-height: 1.2; margin-bottom: 10px; font-family: \'Outfit\', sans-serif; text-shadow: 0 4px 20px rgba(0,0,0,0.3);">'
);

// We need to style the <p> tag containing our text. It's inside a div.
content = content.replace(
  '<p>A research-driven pharmaceutical company',
  '<p style="font-size: 18px; color: #f0f0f0; line-height: 1.6; max-width: 700px; font-family: \'Inter\', sans-serif; background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(10px); padding: 15px 25px; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1);">A research-driven pharmaceutical company'
);

// 6. Replace the single "Get in Touch" button with the two beautifully styled buttons side by side
const oldButtonHtmlRegex = /<div class="elementor-element elementor-element-1419ca0 elementor-widget elementor-widget-button"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;

const newButtonsHtml = `
<div class="elementor-element elementor-widget elementor-widget-button" style="display: flex; gap: 15px; flex-wrap: wrap;">
    <div class="elementor-widget-container">
        <div class="elementor-button-wrapper">
            <a class="elementor-button elementor-button-link elementor-size-sm" href="/products/" style="background-color: #4ade80; color: #001937; border-radius: 30px; padding: 16px 36px; font-weight: bold; font-family: 'Inter', sans-serif;">
                <span class="elementor-button-content-wrapper">
                    <span class="elementor-button-text">OUR PRODUCTS</span>
                </span>
            </a>
        </div>
    </div>
    <div class="elementor-widget-container">
        <div class="elementor-button-wrapper">
            <a class="elementor-button elementor-button-link elementor-size-sm" href="/about-us/" style="background-color: transparent; color: #ffffff; border: 2px solid #ffffff; border-radius: 30px; padding: 14px 34px; font-weight: bold; font-family: 'Inter', sans-serif;">
                <span class="elementor-button-content-wrapper">
                    <span class="elementor-button-text">ABOUT US</span>
                </span>
            </a>
        </div>
    </div>
</div>
`;

content = content.replace(oldButtonHtmlRegex, newButtonsHtml);

fs.writeFileSync('src/content/bodies/index.html', content);
console.log("Successfully rebuilt index.html hero from scratch!");

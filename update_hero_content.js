const fs = require('fs');

let content = fs.readFileSync('src/content/bodies/index.html', 'utf8');

// Replace H1 Title
content = content.replace(
  'From Care To Cure',
  'Delivering Quality Medicines<br><span style="color: #2e7d32;">Improving Global Lives</span>'
);

// Replace Paragraph Text
const oldParagraph = 'Trusted by Patients and Medical Experts worldwide. We have strengthened our\\s*position as leaders in the Indian pharmaceutical sector, and we’ll keep our\\s*commitment to serving humanity through quality medication.';
const newParagraph = 'A research-driven pharmaceutical company delivering high-quality, affordable medicines trusted in over 50+ countries worldwide.';

content = content.replace(new RegExp(oldParagraph, 'g'), newParagraph);

// Replace Buttons
// We need to find the elementor button wrapper and replace it with two buttons
const oldButtonHtmlRegex = /<div class="elementor-element elementor-element-1419ca0 elementor-widget elementor-widget-button"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;

// Using flexbox to align the two buttons side by side
const newButtonsHtml = `
<div class="elementor-element elementor-widget elementor-widget-button" style="display: flex; gap: 15px; flex-wrap: wrap;">
    <div class="elementor-widget-container">
        <div class="elementor-button-wrapper">
            <a class="elementor-button elementor-button-link elementor-size-sm" href="/products/" style="background-color: #001937; color: white;">
                <span class="elementor-button-content-wrapper">
                    <span class="elementor-button-text">OUR PRODUCTS</span>
                </span>
            </a>
        </div>
    </div>
    <div class="elementor-widget-container">
        <div class="elementor-button-wrapper">
            <a class="elementor-button elementor-button-link elementor-size-sm" href="/about-us/" style="background-color: transparent; color: #001937; border: 2px solid #001937;">
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
console.log("Successfully updated the home hero content!");

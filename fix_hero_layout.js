const fs = require('fs');

let content = fs.readFileSync('src/content/bodies/index.html', 'utf8');

// 1. Add a dark gradient overlay to the background image to make text readable
const oldBgStyle = `style="background-image: url('/assets/images/hero-building.jpeg'); background-size: cover; background-position: center; background-repeat: no-repeat;"`;
const newBgStyle = `style="background-image: linear-gradient(rgba(0, 25, 55, 0.65), rgba(0, 25, 55, 0.75)), url('/assets/images/hero-building.jpeg'); background-size: cover; background-position: center; background-repeat: no-repeat; display: flex; align-items: center;"`;
content = content.replace(oldBgStyle, newBgStyle);

// 2. Replace the entire content block of the hero (data-id="15a8dd5") with a beautiful custom layout
const oldContentRegex = /<div class="elementor-element elementor-element-15a8dd5 e-con-full e-flex e-con e-child"[^>]*>[\s\S]*?(?=<\/div>\s*<\/div>\s*<\/div>\s*<div data-elementor-type="wp-page")/i;

const newCreativeContent = `
<div class="elementor-element elementor-element-15a8dd5 e-con-full e-flex e-con e-child" data-id="15a8dd5" data-element_type="container" data-e-type="container" style="width: 100%; max-width: 900px; margin: 0 auto; padding: 40px 20px; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 20px;">
    
    <h1 style="font-size: clamp(36px, 5vw, 64px); font-weight: 800; color: #ffffff; line-height: 1.2; margin-bottom: 10px; font-family: 'Outfit', sans-serif; text-shadow: 0 4px 20px rgba(0,0,0,0.3);">
        Delivering Quality Medicines<br>
        <span style="color: #4ade80; position: relative; display: inline-block;">
            Improving Global Lives
            <svg style="position: absolute; bottom: -10px; left: 0; width: 100%; height: 12px;" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 10C50 -2 150 -2 198 10" stroke="#4ade80" stroke-width="3" stroke-linecap="round"/></svg>
        </span>
    </h1>

    <p style="font-size: 18px; color: #f0f0f0; line-height: 1.6; max-width: 700px; margin: 0 auto 30px auto; font-family: 'Inter', sans-serif; background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(10px); padding: 15px 25px; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1);">
        A research-driven pharmaceutical company delivering high-quality, affordable medicines trusted in over 50+ countries worldwide.
    </p>

    <div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">
        <a href="/products/" style="background: #4ade80; color: #001937; padding: 16px 36px; border-radius: 30px; font-weight: 700; font-size: 16px; text-decoration: none; transition: all 0.3s ease; box-shadow: 0 10px 20px rgba(74, 222, 128, 0.3); font-family: 'Inter', sans-serif; display: inline-flex; align-items: center; gap: 8px;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 15px 25px rgba(74, 222, 128, 0.4)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 10px 20px rgba(74, 222, 128, 0.3)';">
            OUR PRODUCTS
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
        <a href="/about-us/" style="background: transparent; color: #ffffff; padding: 16px 36px; border-radius: 30px; border: 2px solid rgba(255,255,255,0.3); font-weight: 700; font-size: 16px; text-decoration: none; transition: all 0.3s ease; font-family: 'Inter', sans-serif; display: inline-flex; align-items: center; gap: 8px;" onmouseover="this.style.background='rgba(255,255,255,0.1)'; this.style.borderColor='#ffffff';" onmouseout="this.style.background='transparent'; this.style.borderColor='rgba(255,255,255,0.3)';">
            ABOUT US
        </a>
    </div>
</div>
`;

// It's safer to just split and replace because the closing divs are tricky.
// We know it starts exactly at <div class="elementor-element elementor-element-15a8dd5...
// Let's find the start index of 15a8dd5 and the start index of the NEXT sibling (which is elementor-10179 or the closing of e-con-inner)
const startIndex = content.indexOf('<div class="elementor-element elementor-element-15a8dd5');
if (startIndex !== -1) {
    // Look for the end of e-con-inner
    const endMarker = '</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\n\t<div data-elementor-type="wp-page" data-elementor-id="10179" class="elementor elementor-10179">';
    let endIndex = content.indexOf(endMarker);
    
    // If not found, try a generic search for elementor-10179
    if (endIndex === -1) {
        const marker2 = '<div data-elementor-type="wp-page" data-elementor-id="10179"';
        const marker2Index = content.indexOf(marker2);
        // Step back 4 closing divs
        const sectionContent = content.substring(startIndex, marker2Index);
        // Actually, replacing everything between startIndex and a point before marker2
        const lastDivBefore10179 = content.lastIndexOf('</div>', marker2Index - 1);
        const secondLast = content.lastIndexOf('</div>', lastDivBefore10179 - 1);
        const thirdLast = content.lastIndexOf('</div>', secondLast - 1);
        const fourthLast = content.lastIndexOf('</div>', thirdLast - 1);
        endIndex = fourthLast;
    }

    if (endIndex !== -1 && endIndex > startIndex) {
        content = content.substring(0, startIndex) + newCreativeContent + '\n' + content.substring(endIndex);
        fs.writeFileSync('src/content/bodies/index.html', content);
        console.log("Successfully updated the home hero layout!");
    } else {
        console.log("Could not find the end index.");
    }
} else {
    console.log("Could not find the start index.");
}


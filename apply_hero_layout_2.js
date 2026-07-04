const fs = require('fs');
let content = fs.readFileSync('src/content/bodies/index.html', 'utf8');

const startIdx = content.indexOf('<div class="elementor-element elementor-element-15a8dd5');
const marker = '<div data-elementor-type="wp-page" data-elementor-id="10179"';
const markerIdx = content.indexOf(marker);

if (startIdx !== -1 && markerIdx !== -1) {
    // We want to find the exact closing tag before `marker`.
    const blockContent = content.substring(startIdx, markerIdx);
    const endIdx = markerIdx - 100; // rough approximation to not cut into the marker
    
    // Instead of precise endIdx, we'll replace between startIdx and the last closing div of the container
    // We know the structure:
    // <div class="elementor-element-15a8dd5..."> ... </div> </div> </div> </div> </div> </div>
    // Let's replace the whole inner HTML of e-con-inner
    
    const eConInnerStart = content.indexOf('<div class="e-con-inner">', startIdx - 500);
    const wpPage10179 = content.indexOf('<div data-elementor-type="wp-page" data-elementor-id="10179"');
    
    // We can just replace everything from <div class="e-con-inner"> to the closing </div> of the e-con-boxed container
    
    const replacement = `<div class="e-con-inner" style="width: 100%; max-width: 900px; margin: 0 auto; padding: 60px 20px; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 20px;">
        <h1 style="font-size: clamp(36px, 5vw, 64px); font-weight: 800; color: #ffffff; line-height: 1.2; margin-bottom: 10px; font-family: 'Outfit', sans-serif; text-shadow: 0 4px 20px rgba(0,0,0,0.3);">
            Delivering Quality Medicines<br>
            <span style="color: #4ade80; position: relative; display: inline-block;">
                Improving Global Lives
                <svg style="position: absolute; bottom: -10px; left: 0; width: 100%; height: 12px;" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 10C50 -2 150 -2 198 10" stroke="#4ade80" stroke-width="3" stroke-linecap="round"/></svg>
            </span>
        </h1>
        <p style="font-size: 18px; color: #f0f0f0; line-height: 1.6; max-width: 700px; margin: 0 auto 30px auto; font-family: 'Inter', sans-serif; background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(10px); padding: 15px 25px; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1);">
            A research-driven pharmaceutical company delivering high-quality, affordable medicines trusted in over 50+ countries worldwide.
        </p>
        <div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">
            <a href="/products/" style="background: #4ade80; color: #001937; padding: 16px 36px; border-radius: 30px; font-weight: 700; font-size: 16px; text-decoration: none; transition: all 0.3s ease; box-shadow: 0 10px 20px rgba(74, 222, 128, 0.3); font-family: 'Inter', sans-serif; display: inline-flex; align-items: center; gap: 8px;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 15px 25px rgba(74, 222, 128, 0.4)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 10px 20px rgba(74, 222, 128, 0.3)';">
                OUR PRODUCTS
            </a>
            <a href="/about-us/" style="background: transparent; color: #ffffff; padding: 16px 36px; border-radius: 30px; border: 2px solid rgba(255,255,255,0.3); font-weight: 700; font-size: 16px; text-decoration: none; transition: all 0.3s ease; font-family: 'Inter', sans-serif; display: inline-flex; align-items: center; gap: 8px;" onmouseover="this.style.background='rgba(255,255,255,0.1)'; this.style.borderColor='#ffffff';" onmouseout="this.style.background='transparent'; this.style.borderColor='rgba(255,255,255,0.3)';">
                ABOUT US
            </a>
        </div>
    </div>
</div>
</div>
</div>
`;
    
    // We replace from eConInnerStart to the closing of the section.
    // The section ends right before wpPage10179. Let's find the closing tags carefully.
    const beforeSection = content.substring(0, eConInnerStart);
    const afterSection = content.substring(wpPage10179);
    
    content = beforeSection + replacement + '\n\t' + afterSection;
    
    fs.writeFileSync('src/content/bodies/index.html', content);
    console.log("Success");
} else {
    console.log("Indexes not found");
}

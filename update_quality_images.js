const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'content', 'bodies', 'quality.html');
let html = fs.readFileSync(filePath, 'utf-8');

// The replacements to make based on alt texts to ensure we target the exact ones
const replacements = [
    { alt: "Approved Vendor", newSrc: "/assets/uploads/images/quality_01.jpeg" },
    { alt: "Raw Material Inspection", newSrc: "/assets/uploads/images/quality_02.jpeg" },
    { alt: "Manufacturing Process Control", newSrc: "/assets/uploads/images/quality_03.jpeg" },
    { alt: "In-Process Quality Checks", newSrc: "/assets/uploads/images/quality_04.jpeg" },
    { alt: "Finished Product Testing", newSrc: "/assets/uploads/images/quality_05.jpeg" },
    { alt: "Batch Review &amp; Approval", newSrc: "/assets/uploads/images/quality_06.jpeg" },
    { alt: "Packaging Verification", newSrc: "/assets/uploads/images/quality_07.jpeg" },
    { alt: "Market Release", newSrc: "/assets/uploads/images/quality_08.jpeg" },
];

for (const item of replacements) {
    // We construct a regex to match the img tag with the specific alt attribute
    // Note: The alt attribute could be before or after the src attribute, but in our case, src is before alt.
    // Example: <img src="/assets/images/workflow_vendor.png" alt="Approved Vendor">
    
    // We'll use a more flexible regex that captures everything before and after the src attribute, bounded by the alt attribute.
    const regexStr = `<img[^>]*src="([^"]+)"[^>]*alt="${item.alt}"[^>]*>`;
    const regex = new RegExp(regexStr, 'g');
    
    html = html.replace(regex, (match, oldSrc) => {
        return match.replace(`src="${oldSrc}"`, `src="${item.newSrc}"`);
    });
}

fs.writeFileSync(filePath, html, 'utf-8');
console.log("Updated images in quality.html");

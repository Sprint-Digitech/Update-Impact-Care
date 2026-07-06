const fs = require('fs');
const cheerio = require('cheerio');

let html = fs.readFileSync('src/content/bodies/about-us.html', 'utf8');
const $ = cheerio.load(html, { decodeEntities: false }, false);

const qualityHTML = `
<!-- WORLD CLASS QUALITY SECTION -->
<div class="quality-section-wrapper">
    <div class="quality-container">
        
        <!-- Left Column: Content -->
        <div class="quality-content-col">
            <div class="quality-badge">
                <div class="quality-badge-dot"></div>
                Our Commitment
            </div>
            
            <h2 class="quality-heading">World-Class Quality & Strategic Partnerships</h2>
            
            <p class="quality-desc">To ensure world-class quality, we have established strategic partnerships with reputed pharmaceutical manufacturers that operate in compliance with internationally recognized quality systems, including EU-GMP, WHO-GMP, ISO, and other applicable regulatory standards. These collaborations allow us to offer a diverse portfolio of high-quality formulations manufactured under stringent quality control and regulatory compliance.</p>
            
            <div class="quality-objective-card">
                <div class="quality-objective-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                </div>
                <div class="quality-objective-text">
                    "Our objective is to become a trusted pharmaceutical partner by delivering products that meet the expectations of global healthcare markets."
                </div>
            </div>
        </div>

        <!-- Right Column: Image & Certifications -->
        <div class="quality-image-col">
            <img src="/assets/uploads/2024/12/backup/health-item-img-2.jpg" alt="Quality Manufacturing" class="quality-main-img" onerror="this.src='/assets/uploads/2024/11/about-img-1.jpg'">
            
            <div class="cert-float cert-1">
                <div class="cert-icon">EU</div>
                <div class="cert-text">EU-GMP Certified</div>
            </div>
            
            <div class="cert-float cert-2">
                <div class="cert-icon">WHO</div>
                <div class="cert-text">WHO-GMP Approved</div>
            </div>
            
            <div class="cert-float cert-3">
                <div class="cert-icon">ISO</div>
                <div class="cert-text">ISO Standards</div>
            </div>
        </div>
        
    </div>
</div>
<!-- END WORLD CLASS QUALITY SECTION -->
`;

const expertiseWrapper = $('.expertise-section-wrapper');
if (expertiseWrapper.length) {
    expertiseWrapper.after(qualityHTML);
    console.log("Appended quality section after expertise section.");
} else {
    // fallback if not found
    console.log("Could not find .expertise-section-wrapper, appending to wp-page instead.");
    $('[data-elementor-type="wp-page"]').append(qualityHTML);
}

let finalHtml = $.html();
if (finalHtml.includes('<html><head>')) {
    finalHtml = finalHtml.replace(/<html><head>.*?<\/head><body>/s, '');
    finalHtml = finalHtml.replace(/<\/body><\/html>/, '');
}

fs.writeFileSync('src/content/bodies/about-us.html', finalHtml);
console.log("Successfully updated about-us.html with Quality section.");

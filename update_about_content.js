const fs = require('fs');
const cheerio = require('cheerio');

let html = fs.readFileSync('src/content/bodies/about-us.html', 'utf8');
const $ = cheerio.load(html, { decodeEntities: false }, false);

const newHTML = `
<!-- NEW ABOUT US SECTIONS -->
<div class="about-page-wrapper">
    
    <!-- Section 1: Intro / Hero -->
    <section class="about-intro-section">
        <div class="about-intro-content">
            <div class="about-badge">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#2b3a8c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 16V12" stroke="#2b3a8c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 8H12.01" stroke="#2b3a8c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                About Us
            </div>
            <h2 class="about-intro-title">Delivering Quality Medicines.<br>Building Global Trust.</h2>
            <p class="about-intro-text">We are a fast-growing pharmaceutical company dedicated to delivering high-quality pharmaceutical, nutraceutical, and herbal healthcare products to domestic and international markets. Our commitment to innovation, quality, and ethical business practices enables us to provide reliable healthcare solutions that improve lives worldwide.</p>
        </div>
        <div class="about-intro-image-col">
            <img src="/wp-content/uploads/2024/11/about-img-1.jpg" alt="About Impact Care" class="about-intro-img">
        </div>
    </section>

    <!-- Section 2: Quality & Partnerships -->
    <section class="about-quality-section">
        <div class="about-quality-container">
            <p class="about-quality-text">To ensure world-class quality, we have established strategic partnerships with reputed pharmaceutical manufacturers that operate in compliance with internationally recognized quality systems, including EU-GMP, WHO-GMP, ISO, and other applicable regulatory standards. These collaborations allow us to offer a diverse portfolio of high-quality formulations manufactured under stringent quality control and regulatory compliance.</p>
            
            <div class="about-cert-grid">
                <div class="about-cert-card">
                    <div class="about-cert-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                    </div>
                    <div class="about-cert-title">EU-GMP<br>Certified</div>
                </div>
                <div class="about-cert-card">
                    <div class="about-cert-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                    </div>
                    <div class="about-cert-title">WHO-GMP<br>Compliant</div>
                </div>
                <div class="about-cert-card">
                    <div class="about-cert-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    </div>
                    <div class="about-cert-title">ISO<br>Standards</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Section 3: Bento Grid -->
    <section class="about-vision-section">
        <div class="about-bento-card bento-light">
            <h3 class="bento-title">Our Product Range</h3>
            <p class="bento-text">Our product range spans multiple therapeutic segments and dosage forms, serving hospitals, healthcare professionals, distributors, institutional buyers, and international business partners. Every product undergoes rigorous quality assurance processes to ensure safety, efficacy, consistency, and reliability.</p>
        </div>
        <div class="about-bento-card bento-dark">
            <h3 class="bento-title">Global Presence</h3>
            <p class="bento-text">Driven by scientific excellence and customer satisfaction, we continue to expand our global presence through innovation, strategic alliances, and long-term partnerships. Our objective is to become a trusted pharmaceutical partner by delivering products that meet the expectations of global healthcare markets.</p>
        </div>
    </section>

</div>
<!-- END NEW ABOUT US SECTIONS -->
`;

// Replace first section with our new HTML
$('[data-id="bfc9648"]').replaceWith(newHTML);

// Remove the other old sections
['bf4debc', '6e38495', 'd7aa488'].forEach(id => {
    $(`[data-id="${id}"]`).remove();
});

let finalHtml = $.html();
if (finalHtml.includes('<html><head>')) {
    finalHtml = finalHtml.replace(/<html><head>.*?<\/head><body>/s, '');
    finalHtml = finalHtml.replace(/<\/body><\/html>/, '');
}

fs.writeFileSync('src/content/bodies/about-us.html', finalHtml);
console.log("Successfully updated about-us.html with new design");

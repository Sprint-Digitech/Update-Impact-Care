const fs = require('fs');
const cheerio = require('cheerio');

// Load pristine about-us.html from git to start fresh
require('child_process').execSync('git checkout 67d4161 -- src/content/bodies/about-us.html');
console.log("Restored about-us.html from git");

let html = fs.readFileSync('src/content/bodies/about-us.html', 'utf8');

// Also load the updated footer from index.html (so we don't break the footer)
const indexHtml = fs.readFileSync('src/content/bodies/index.html', 'utf8');
const $index = cheerio.load(indexHtml, { decodeEntities: false }, false);
const newFooterOuter = $index.html($index('[data-id="0151cb0"]'));

const $ = cheerio.load(html, { decodeEntities: false }, false);

// Empty the main page content wrapper
const mainPageWrapper = $('[data-elementor-type="wp-page"]');
if (mainPageWrapper.length) {
    mainPageWrapper.empty();
    console.log("Emptied the main page content");
} else {
    console.log("Could not find wp-page element");
}

// Build the new, beautiful premium design
const newContent = `
<!-- NEW PREMIUM ABOUT US DESIGN -->
<div class="about-premium-wrapper">
    <!-- Hero / Top Banner -->
    <section class="about-hero-section">
        <div class="about-hero-overlay"></div>
        <div class="about-hero-content">
            <h1 class="about-page-title">About Us</h1>
            <div class="about-hero-badge">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 16V12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 8H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                Delivering Quality Medicines. Building Global Trust.
            </div>
        </div>
    </section>

    <div class="about-content-container">
        <!-- Section 1: Intro -->
        <section class="premium-intro-section">
            <div class="premium-intro-text">
                <h2 class="premium-heading">A Legacy of <span class="text-accent">Healing</span> & Innovation</h2>
                <p class="premium-paragraph">We are a fast-growing pharmaceutical company dedicated to delivering high-quality pharmaceutical, nutraceutical, and herbal healthcare products to domestic and international markets.</p>
                <p class="premium-paragraph">Our commitment to innovation, quality, and ethical business practices enables us to provide reliable healthcare solutions that improve lives worldwide.</p>
            </div>
            <div class="premium-intro-image">
                <img src="/wp-content/uploads/2024/11/about-img-1.jpg" alt="Healthcare Professionals">
                <div class="premium-floating-card">
                    <div class="floating-stat">200+</div>
                    <div class="floating-text">Experts Worldwide</div>
                </div>
            </div>
        </section>

        <!-- Section 2: Quality & Compliance -->
        <section class="premium-quality-section">
            <div class="quality-content">
                <h2 class="premium-heading text-white">World-Class Quality Standards</h2>
                <p class="premium-paragraph text-light">To ensure world-class quality, we have established strategic partnerships with reputed pharmaceutical manufacturers that operate in compliance with internationally recognized quality systems, including EU-GMP, WHO-GMP, ISO, and other applicable regulatory standards.</p>
                <p class="premium-paragraph text-light">These collaborations allow us to offer a diverse portfolio of high-quality formulations manufactured under stringent quality control and regulatory compliance.</p>
                
                <div class="quality-badges">
                    <div class="quality-badge"><div class="badge-icon">EU</div><span>EU-GMP</span></div>
                    <div class="quality-badge"><div class="badge-icon">WHO</div><span>WHO-GMP</span></div>
                    <div class="quality-badge"><div class="badge-icon">ISO</div><span>ISO Certified</span></div>
                </div>
            </div>
        </section>

        <!-- Section 3: Product Range & Global Reach -->
        <section class="premium-bento-section">
            <div class="bento-card bento-product">
                <div class="bento-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                </div>
                <h3>Our Product Range</h3>
                <p>Our product range spans multiple therapeutic segments and dosage forms, serving hospitals, healthcare professionals, distributors, institutional buyers, and international business partners. Every product undergoes rigorous quality assurance processes to ensure safety, efficacy, consistency, and reliability.</p>
            </div>
            <div class="bento-card bento-vision">
                <div class="bento-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                </div>
                <h3>Global Presence</h3>
                <p>Driven by scientific excellence and customer satisfaction, we continue to expand our global presence through innovation, strategic alliances, and long-term partnerships. Our objective is to become a trusted pharmaceutical partner by delivering products that meet the expectations of global healthcare markets.</p>
            </div>
        </section>
    </div>
</div>
<!-- END NEW PREMIUM ABOUT US DESIGN -->
`;

mainPageWrapper.append(newContent);
console.log("Appended new beautiful design");

// Replace footer to ensure it matches index.html
$('[data-id="0151cb0"]').replaceWith(newFooterOuter);
console.log("Restored footer");

let finalHtml = $.html();
if (finalHtml.includes('<html><head>')) {
    finalHtml = finalHtml.replace(/<html><head>.*?<\/head><body>/s, '');
    finalHtml = finalHtml.replace(/<\/body><\/html>/, '');
}

fs.writeFileSync('src/content/bodies/about-us.html', finalHtml);
console.log("Successfully completely rewritten about-us.html content!");

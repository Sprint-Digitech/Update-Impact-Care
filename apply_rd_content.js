const fs = require('fs');
const cheerio = require('cheerio');

let html = fs.readFileSync('src/content/bodies/rd.html', 'utf8');
const $ = cheerio.load(html, { decodeEntities: false }, false);

const rdContentHTML = `
<!-- R&D SECTION 1: INTRO (SPLIT) -->
<div class="rd-awaken-intro">
    <div class="rd-awaken-intro-container">
        <div class="rd-awaken-content-col">
            <div class="rd-awaken-badge">
                <div class="rd-badge-dot"></div>
                Research & Development (R&D)
            </div>
            <h2 class="rd-awaken-heading">Innovating Today for a Healthier Tomorrow</h2>
            <p class="rd-awaken-desc">Research and Development is a key driver of our growth and commitment to healthcare excellence. We continuously work towards identifying market needs, developing innovative formulations, and improving existing products to provide effective, safe, and affordable healthcare solutions.</p>
            <p class="rd-awaken-desc">Through collaboration with experienced scientists, formulation experts, and internationally compliant manufacturing partners, we strive to bring high-quality pharmaceutical, nutraceutical, and herbal products to healthcare professionals and patients worldwide.</p>
        </div>
        <div class="rd-awaken-image-col">
            <img src="/wp-content/uploads/2024/12/health-item-img-3.jpg" alt="Innovating Today" class="rd-awaken-main-img" onerror="this.src='/assets/images/rd-hero-banner.png'">
        </div>
    </div>
</div>

<!-- R&D SECTION 2: PHILOSOPHY (GLASSMORPHISM) -->
<div class="rd-awaken-philosophy">
    <div class="rd-philosophy-glass-box">
        <h2 class="rd-philosophy-title">Our R&D Philosophy</h2>
        <div class="rd-philosophy-subtitle">Innovation, Quality, and Patient-Centric Development</div>
        <p class="rd-philosophy-text">Our research activities focus on creating products that offer improved efficacy, better patient compliance, enhanced stability, and superior therapeutic outcomes.</p>
        <p class="rd-philosophy-text">We believe that meaningful innovation is achieved by combining scientific expertise, market insights, regulatory compliance, and quality-driven development processes.</p>
    </div>
</div>

<!-- R&D SECTION 3: INFRASTRUCTURE (BENTO GRID) -->
<div class="rd-bento-section">
    <div class="rd-bento-container">
        <h2 class="rd-section-title">Manufacturing Infrastructure</h2>
        <p style="text-align:center; color:#475569; font-size:18px; margin-bottom:50px;">Our manufacturing infrastructure are equipped with:</p>
        
        <div class="rd-bento-grid">
            <!-- Item 1 -->
            <div class="rd-bento-card">
                <div class="rd-bento-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><circle cx="12" cy="14" r="4"></circle><line x1="12" y1="6" x2="12.01" y2="6"></line></svg></div>
                <div class="rd-bento-text">Automated Production Equipment</div>
            </div>
            <!-- Item 2 -->
            <div class="rd-bento-card">
                <div class="rd-bento-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></div>
                <div class="rd-bento-text">Controlled Manufacturing Environment</div>
            </div>
            <!-- Item 3 -->
            <div class="rd-bento-card">
                <div class="rd-bento-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg></div>
                <div class="rd-bento-text">Modern Quality Control Laboratories</div>
            </div>
            <!-- Item 4 -->
            <div class="rd-bento-card">
                <div class="rd-bento-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg></div>
                <div class="rd-bento-text">Stability Study Chambers</div>
            </div>
            <!-- Item 5 -->
            <div class="rd-bento-card">
                <div class="rd-bento-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg></div>
                <div class="rd-bento-text">Microbiology Laboratories</div>
            </div>
            <!-- Item 6 -->
            <div class="rd-bento-card">
                <div class="rd-bento-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line><path d="M19 4h-1V2h-4v2H10V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z"></path></svg></div>
                <div class="rd-bento-text">High-Speed Packaging Lines</div>
            </div>
        </div>
    </div>
</div>
`;

// Find elementor wrapper and append to it
$('[data-elementor-type="wp-page"]').append(rdContentHTML);

let finalHtml = $.html();
if (finalHtml.includes('<html><head>')) {
    finalHtml = finalHtml.replace(/<html><head>.*?<\/head><body>/s, '');
    finalHtml = finalHtml.replace(/<\/body><\/html>/, '');
}

fs.writeFileSync('src/content/bodies/rd.html', finalHtml);
console.log("Injected 3 new R&D sections into rd.html");

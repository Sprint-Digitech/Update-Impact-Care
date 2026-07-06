const fs = require('fs');
const cheerio = require('cheerio');

let html = fs.readFileSync('src/content/bodies/manufacturing.html', 'utf8');
const $ = cheerio.load(html, { decodeEntities: false }, false);

const awakenManufacturingHTML = `
<!-- AWAKEN MANUFACTURING SECTIONS -->
<!-- Section 1: Intro Split -->
<div class="mfg-awaken-intro">
    <div class="mfg-awaken-intro-container">
        
        <div class="mfg-awaken-content-col">
            <div class="mfg-awaken-badge">
                <div class="mfg-badge-dot"></div>
                Our Commitment
            </div>
            <h2 class="mfg-awaken-heading">Our Manufacturing Partnerships</h2>
            <p class="mfg-awaken-desc">Quality is at the heart of everything we do. We collaborate with carefully selected pharmaceutical manufacturing partners that maintain advanced production facilities and operate in accordance with internationally accepted Good Manufacturing Practices (GMP).</p>
        </div>

        <div class="mfg-awaken-image-col">
            <img src="/assets/uploads/2024/12/health-item-img-2.jpg" alt="Manufacturing Facility" class="mfg-awaken-main-img" onerror="this.src='/wp-content/uploads/2024/12/health-item-img-2.jpg'">
            
            <div class="mfg-awaken-float-badge">
                <div class="mfg-float-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                </div>
                <div class="mfg-float-text">GMP Certified</div>
            </div>
        </div>
        
    </div>
</div>

<!-- Section 2: Glassmorphism Core Strengths -->
<div class="mfg-awaken-strengths">
    <div class="mfg-awaken-strengths-container">
        <h2 class="mfg-strengths-heading">Our manufacturing network offers:</h2>
        
        <div class="mfg-glass-grid">
            <div class="mfg-glass-card">
                <div class="mfg-glass-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg></div>
                <div class="mfg-glass-text">Partnerships with manufacturers following EU-GMP, WHO-GMP, and ISO quality management systems*</div>
            </div>
            <div class="mfg-glass-card">
                <div class="mfg-glass-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><circle cx="12" cy="14" r="4"></circle><line x1="12" y1="6" x2="12.01" y2="6"></line></svg></div>
                <div class="mfg-glass-text">State-of-the-art manufacturing infrastructure</div>
            </div>
            <div class="mfg-glass-card">
                <div class="mfg-glass-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg></div>
                <div class="mfg-glass-text">Advanced quality control and quality assurance laboratories</div>
            </div>
            <div class="mfg-glass-card">
                <div class="mfg-glass-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg></div>
                <div class="mfg-glass-text">Modern analytical and microbiology testing facilities</div>
            </div>
            <div class="mfg-glass-card">
                <div class="mfg-glass-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg></div>
                <div class="mfg-glass-text">Stringent raw material qualification and supplier evaluation</div>
            </div>
            <div class="mfg-glass-card">
                <div class="mfg-glass-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg></div>
                <div class="mfg-glass-text">Robust validation and documentation practices</div>
            </div>
            <div class="mfg-glass-card">
                <div class="mfg-glass-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg></div>
                <div class="mfg-glass-text">Stable, scalable, and reliable manufacturing capacity</div>
            </div>
            <div class="mfg-glass-card">
                <div class="mfg-glass-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></div>
                <div class="mfg-glass-text">Compliance with applicable national and international regulatory requirements</div>
            </div>
        </div>
    </div>
</div>

<!-- Section 3: Impact Overlap -->
<div class="mfg-awaken-impact">
    <div class="mfg-impact-overlap-container">
        
        <div class="mfg-overlap-img-box">
            <img src="/assets/uploads/2024/12/happy-client-img-1.jpg" alt="Client Delivery" class="mfg-overlap-img" onerror="this.src='/wp-content/uploads/2024/12/happy-client-img-1.jpg'">
        </div>
        
        <div class="mfg-overlap-content-box">
            <div class="mfg-overlap-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            </div>
            <p class="mfg-overlap-text">
                "These strategic collaborations enable us to deliver pharmaceutical products that consistently meet high standards of quality, safety, and performance while ensuring dependable supply to our customers."
            </p>
        </div>
        
    </div>
</div>
<!-- END AWAKEN MANUFACTURING SECTIONS -->
`;

$('[data-elementor-type="wp-page"]').append(awakenManufacturingHTML);

let finalHtml = $.html();
if (finalHtml.includes('<html><head>')) {
    finalHtml = finalHtml.replace(/<html><head>.*?<\/head><body>/s, '');
    finalHtml = finalHtml.replace(/<\/body><\/html>/, '');
}

fs.writeFileSync('src/content/bodies/manufacturing.html', finalHtml);
console.log("Successfully appended image-heavy Awaken sections below original Elementor hero.");

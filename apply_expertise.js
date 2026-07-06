const fs = require('fs');
const cheerio = require('cheerio');

let html = fs.readFileSync('src/content/bodies/about-us.html', 'utf8');
const $ = cheerio.load(html, { decodeEntities: false }, false);

const expertiseHTML = `
<!-- EXPERTISE SECTION -->
<div class="expertise-section-wrapper">
    <div class="expertise-container">
        
        <!-- Left Column: Content -->
        <div class="expertise-content-col">
            <div class="expertise-badge">
                <div class="expertise-badge-dot"></div>
                Our Expertise
            </div>
            
            <h2 class="expertise-heading">Expanding Global Presence Through Scientific Excellence</h2>
            
            <p class="expertise-desc">Our product range spans multiple therapeutic segments and dosage forms, serving hospitals, healthcare professionals, distributors, institutional buyers, and international business partners.</p>
            
            <div class="expertise-cards-grid">
                <!-- Card 1 -->
                <div class="expertise-card">
                    <div class="expertise-card-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    </div>
                    <div class="expertise-card-title">Quality Assurance</div>
                    <p class="expertise-card-desc">Every product undergoes rigorous quality assurance processes to ensure safety, efficacy, consistency, and reliability.</p>
                    <div class="expertise-card-divider"></div>
                    <div class="expertise-card-footer">
                        <div class="expertise-footer-dot"></div>
                        Ensuring safety and efficacy.
                    </div>
                </div>

                <!-- Card 2 -->
                <div class="expertise-card">
                    <div class="expertise-card-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                    </div>
                    <div class="expertise-card-title">Global Partnerships</div>
                    <p class="expertise-card-desc">We continue to expand our global presence through innovation, strategic alliances, and long-term partnerships.</p>
                    <div class="expertise-card-divider"></div>
                    <div class="expertise-card-footer">
                        <div class="expertise-footer-dot"></div>
                        Trusted pharmaceutical partner.
                    </div>
                </div>
            </div>
        </div>

        <!-- Right Column: Image -->
        <div class="expertise-image-col">
            <div class="expertise-floating-dot"></div>
            <img src="/assets/uploads/2024/11/about-img-2.jpg" alt="Our Expertise" onerror="this.src='/assets/uploads/2024/12/backup/team-1.jpg'">
        </div>
        
    </div>
</div>
<!-- END EXPERTISE SECTION -->
`;

const awakenWrapper = $('.awaken-about-wrapper');
if (awakenWrapper.length) {
    awakenWrapper.after(expertiseHTML);
    console.log("Appended expertise section after awaken section.");
} else {
    // fallback if not found
    console.log("Could not find .awaken-about-wrapper, appending to wp-page instead.");
    $('[data-elementor-type="wp-page"]').append(expertiseHTML);
}

let finalHtml = $.html();
if (finalHtml.includes('<html><head>')) {
    finalHtml = finalHtml.replace(/<html><head>.*?<\/head><body>/s, '');
    finalHtml = finalHtml.replace(/<\/body><\/html>/, '');
}

fs.writeFileSync('src/content/bodies/about-us.html', finalHtml);
console.log("Successfully updated about-us.html with Expertise theme design.");

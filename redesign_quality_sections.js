const fs = require('fs');
const cheerio = require('cheerio');

// 1. New CSS for the sections
let css = fs.readFileSync('src/styles/globals.css', 'utf8');

const v3Css = `
/* =========================================
   QUALITY PAGE: V3 REDESIGN
   ========================================= */

/* 1. Intro Section V3 (Overlapping Card Style) */
.q-intro-v3 {
    background-color: #f8fafc;
    padding: 120px 20px;
    font-family: 'Inter', sans-serif;
    position: relative;
}
.q-intro-v3-container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    position: relative;
}
.q-intro-v3-image-wrapper {
    width: 60%;
    position: relative;
    z-index: 1;
}
.q-intro-v3-image-wrapper img {
    width: 100%;
    border-radius: 20px;
    box-shadow: 0 30px 60px rgba(0,0,0,0.1);
}
.q-intro-v3-content {
    width: 50%;
    background: #ffffff;
    padding: 60px;
    border-radius: 20px;
    box-shadow: 0 40px 80px rgba(0,0,0,0.08);
    position: absolute;
    right: 0;
    z-index: 2;
    border-left: 5px solid #00b853;
}
.q-intro-v3-badge {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: #f0fdf4;
    color: #00b853;
    padding: 8px 16px;
    border-radius: 30px;
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 20px;
}
.q-intro-v3-title {
    font-size: 38px;
    font-weight: 800;
    color: #1e293b;
    line-height: 1.2;
    margin-bottom: 20px;
}
.q-intro-v3-desc {
    font-size: 16px;
    color: #475569;
    line-height: 1.7;
    margin-bottom: 30px;
}
.q-intro-v3-list {
    list-style: none;
    padding: 0;
}
.q-intro-v3-list li {
    font-size: 15px;
    font-weight: 600;
    color: #334155;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 12px;
}
.q-intro-v3-list li i {
    color: #f97316;
    background: #fff7ed;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
}

@media (max-width: 992px) {
    .q-intro-v3-container { flex-direction: column; }
    .q-intro-v3-image-wrapper, .q-intro-v3-content { width: 100%; position: relative; }
    .q-intro-v3-content { margin-top: -50px; padding: 40px; }
}

/* 2. Quality Policy V3 (Premium Parallax + Glassmorphism) */
.q-policy-v3 {
    background-image: url('/assets/images/quality_lab.png');
    background-attachment: fixed;
    background-size: cover;
    background-position: center;
    padding: 140px 20px;
    position: relative;
}
.q-policy-v3::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(15, 23, 42, 0.85); /* Dark blue overlay */
    z-index: 1;
}
.q-policy-v3-container {
    max-width: 900px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(15px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 60px 80px;
    border-radius: 30px;
    text-align: center;
    box-shadow: 0 40px 80px rgba(0,0,0,0.3);
}
.q-policy-v3-icon {
    width: 70px;
    height: 70px;
    background: linear-gradient(135deg, #00b853, #f97316);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    color: #ffffff;
    margin: 0 auto 30px;
    box-shadow: 0 10px 20px rgba(0, 184, 83, 0.3);
}
.q-policy-v3-quote {
    font-size: 28px;
    font-weight: 300;
    color: #ffffff;
    font-style: italic;
    line-height: 1.6;
    margin-bottom: 30px;
}
.q-policy-v3-author {
    font-size: 16px;
    font-weight: 700;
    color: #00b853;
    text-transform: uppercase;
    letter-spacing: 2px;
}

@media (max-width: 768px) {
    .q-policy-v3-container { padding: 40px 20px; }
    .q-policy-v3-quote { font-size: 22px; }
}
`;

css += '\n' + v3Css;
fs.writeFileSync('src/styles/globals.css', css);

// 2. Replace the HTML
let html = fs.readFileSync('src/content/bodies/quality.html', 'utf8');
const $ = cheerio.load(html, { decodeEntities: false }, false);

const introV3Html = `
<!-- SECTION 1: Intro (V3) -->
<div class="q-intro-v3">
    <div class="q-intro-v3-container">
        <div class="q-intro-v3-image-wrapper">
            <img src="/assets/images/quality_intro.png" alt="Scientist Inspecting Quality">
        </div>
        <div class="q-intro-v3-content">
            <div class="q-intro-v3-badge"><i class="fa fa-shield-alt"></i> Quality First</div>
            <h2 class="q-intro-v3-title">Quality Beyond Compliance. Excellence Beyond Expectations.</h2>
            <p class="q-intro-v3-desc">At our company, quality is not merely a requirement—it is the foundation of everything we do. We are committed to ensuring that every product delivered to healthcare professionals, patients, distributors, and international partners consistently meets the highest standards of safety, efficacy, quality, and reliability.</p>
            <p class="q-intro-v3-desc">Through strategic collaborations with reputed pharmaceutical manufacturing partners operating under internationally recognized quality systems, we maintain stringent quality control throughout the entire product lifecycle.</p>
            
            <h3 style="color:#1e293b; font-size:20px; font-weight:700; margin-top:20px; margin-bottom:15px;">Our Quality Commitment</h3>
            <ul class="q-intro-v3-list">
                <li><i class="fa fa-check"></i> Delivering safe and effective healthcare products</li>
                <li><i class="fa fa-check"></i> Maintaining consistency in every batch</li>
                <li><i class="fa fa-check"></i> Following stringent quality assurance procedures</li>
                <li><i class="fa fa-check"></i> Ensuring regulatory compliance & documentation</li>
                <li><i class="fa fa-check"></i> Continuously improving quality systems</li>
                <li><i class="fa fa-check"></i> Building trust through transparency</li>
            </ul>
        </div>
    </div>
</div>
`;

const policyV3Html = `
<!-- SECTION 2: Policy (V3) -->
<div class="q-policy-v3">
    <div class="q-policy-v3-container">
        <div class="q-policy-v3-icon"><i class="fa fa-quote-left"></i></div>
        <div class="q-policy-v3-quote">
            "We are committed to providing high-quality pharmaceutical, nutraceutical, and herbal healthcare products that consistently meet customer expectations and applicable regulatory requirements through continuous improvement, ethical business practices, and a culture of quality excellence."
        </div>
        <div class="q-policy-v3-author">Our Quality Policy</div>
    </div>
</div>
`;

// Remove the old v2 sections or original sections
$('.q-intro-v2').remove();
$('.q-policy-v2').remove();
$('.q-intro-section').remove();
$('.q-policy-section').remove();

// Insert the new sections right after the hero banner
// The hero banner is at wpPage.children().first() since we fixed the order
const heroBanner = $('[data-elementor-type="wp-page"]').children('.elementor-element-11af3d9').first();
if (heroBanner.length) {
    heroBanner.after(introV3Html + '\n' + policyV3Html);
} else {
    // Fallback if hero banner class is different
    $('[data-elementor-type="wp-page"]').prepend(introV3Html + '\n' + policyV3Html);
}

let finalHtml = $.html();
if (finalHtml.includes('<html><head>')) {
    finalHtml = finalHtml.replace(/<html><head>.*?<\/head><body>/s, '');
    finalHtml = finalHtml.replace(/<\/body><\/html>/, '');
}

fs.writeFileSync('src/content/bodies/quality.html', finalHtml);
console.log("Successfully replaced Intro and Policy sections with V3 designs.");

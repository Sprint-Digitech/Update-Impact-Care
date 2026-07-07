const fs = require('fs');
const cheerio = require('cheerio');

let html = fs.readFileSync('src/content/bodies/quality.html', 'utf8');
const $ = cheerio.load(html, { decodeEntities: false }, false);

const qualityHtml = `
<!-- 1. Intro & Commitment (Awaken Split) -->
<div class="q-intro-section">
    <div class="q-intro-container">
        <div>
            <div class="q-badge"><i class="fa fa-shield-alt q-badge-icon"></i> Quality First</div>
            <h2 class="q-heading">Quality Beyond Compliance. Excellence Beyond Expectations.</h2>
            <p class="q-desc">At our company, quality is not merely a requirement—it is the foundation of everything we do. We are committed to ensuring that every product delivered to healthcare professionals, patients, distributors, and international partners consistently meets the highest standards of safety, efficacy, quality, and reliability.</p>
            <p class="q-desc">Through strategic collaborations with reputed pharmaceutical manufacturing partners operating under internationally recognized quality systems, we maintain stringent quality control throughout the entire product lifecycle.</p>
            
            <h3 style="color:#0f172a; font-size:24px; font-weight:800; margin-top:30px; margin-bottom:20px;">Our Quality Commitment</h3>
            <p class="q-desc" style="margin-bottom:15px;">We are dedicated to:</p>
            <ul class="q-commitment-list">
                <li><i class="fa fa-check-circle"></i> Delivering safe and effective healthcare products</li>
                <li><i class="fa fa-check-circle"></i> Maintaining consistency in every batch</li>
                <li><i class="fa fa-check-circle"></i> Following stringent quality assurance procedures</li>
                <li><i class="fa fa-check-circle"></i> Ensuring regulatory compliance and documentation integrity</li>
                <li><i class="fa fa-check-circle"></i> Continuously improving quality systems and processes</li>
                <li><i class="fa fa-check-circle"></i> Building trust through transparency and accountability</li>
            </ul>
        </div>
        <div class="q-intro-img-box">
            <img src="/assets/images/quality_intro.png" class="q-intro-img" alt="Scientist inspecting vial">
        </div>
    </div>
</div>

<!-- 2. Quality Policy (Figma Premium Quote) -->
<div class="q-policy-section">
    <div class="q-policy-container">
        <i class="fa fa-quote-left q-quote-icon"></i>
        <p class="q-policy-text">"We are committed to providing high-quality pharmaceutical, nutraceutical, and herbal healthcare products that consistently meet customer expectations and applicable regulatory requirements through continuous improvement, ethical business practices, and a culture of quality excellence."</p>
        <div class="q-policy-title">Our Quality Policy</div>
    </div>
</div>

<!-- 3. Manufacturing Excellence (Bento Grid) -->
<div class="q-mfg-section">
    <div class="q-mfg-container">
        <div class="q-section-head">
            <h2>Manufacturing Excellence</h2>
            <p>Our products are manufactured at advanced facilities operated by trusted manufacturing partners adhering to internationally accepted Good Manufacturing Practices (GMP).</p>
        </div>
        
        <div class="q-bento-grid">
            <div class="q-bento-card"><i class="fa fa-building"></i><h4>WHO-GMP Compliant Facilities*</h4></div>
            <div class="q-bento-card"><i class="fa fa-globe-europe"></i><h4>EU-GMP Aligned Manufacturing Partnerships*</h4></div>
            <div class="q-bento-card"><i class="fa fa-certificate"></i><h4>ISO Certified Quality Systems*</h4></div>
            <div class="q-bento-card"><i class="fa fa-industry"></i><h4>Modern Production Infrastructure</h4></div>
            <div class="q-bento-card"><i class="fa fa-cogs"></i><h4>Automated Manufacturing Processes</h4></div>
            <div class="q-bento-card"><i class="fa fa-temperature-low"></i><h4>Controlled Production Environment</h4></div>
            <div class="q-bento-card"><i class="fa fa-file-alt"></i><h4>Stringent Documentation Systems</h4></div>
            <div class="q-bento-card"><i class="fa fa-search"></i><h4>Batch Traceability and Monitoring</h4></div>
        </div>
        
        <div class="q-mfg-note">* Subject to certifications held by respective manufacturing partners.</div>
    </div>
</div>

<!-- 4. QA & QC (Glassmorphism Dual Column) -->
<div class="q-qaqc-section">
    <div class="q-qaqc-container">
        <!-- QA -->
        <div class="q-glass-card">
            <h3>Quality Assurance (QA)</h3>
            <p>Our Quality Assurance framework ensures that quality is built into every stage of the product lifecycle.</p>
            <ul class="q-list-2col">
                <li><i class="fa fa-check"></i> Vendor Qualification</li>
                <li><i class="fa fa-check"></i> Raw Material Verification</li>
                <li><i class="fa fa-check"></i> Batch Manufacturing Review</li>
                <li><i class="fa fa-check"></i> Process Validation</li>
                <li><i class="fa fa-check"></i> Packaging Verification</li>
                <li><i class="fa fa-check"></i> Documentation Control</li>
                <li><i class="fa fa-check"></i> Change Control Management</li>
                <li><i class="fa fa-check"></i> Product Release Authorization</li>
                <li><i class="fa fa-check"></i> Stability Monitoring</li>
            </ul>
        </div>
        
        <!-- QC -->
        <div class="q-glass-card">
            <h3>Quality Control (QC)</h3>
            <p>Every product undergoes rigorous testing to ensure compliance with predefined specifications.</p>
            <ul class="q-list-2col">
                <li><i class="fa fa-flask"></i> Identity Testing</li>
                <li><i class="fa fa-flask"></i> Assay & Potency Testing</li>
                <li><i class="fa fa-flask"></i> Dissolution Testing</li>
                <li><i class="fa fa-flask"></i> Uniformity Testing</li>
                <li><i class="fa fa-flask"></i> Moisture Analysis</li>
                <li><i class="fa fa-flask"></i> Microbiological Testing</li>
                <li><i class="fa fa-flask"></i> Stability Testing</li>
                <li><i class="fa fa-flask"></i> Packaging Integrity Testing</li>
            </ul>
        </div>
    </div>
</div>

<!-- 5. Quality Workflow (Interactive Timeline) -->
<div class="q-workflow-section">
    <div class="q-section-head" style="margin-bottom:80px;">
        <h2 style="color:#1e293b;">Quality Workflow</h2>
    </div>
    <div class="q-timeline">
        <div class="q-tl-item q-tl-left"><div class="q-tl-content"><h4>1. Approved Vendor</h4></div></div>
        <div class="q-tl-item q-tl-right"><div class="q-tl-content"><h4>2. Raw Material Inspection</h4></div></div>
        <div class="q-tl-item q-tl-left"><div class="q-tl-content"><h4>3. Manufacturing Process Control</h4></div></div>
        <div class="q-tl-item q-tl-right"><div class="q-tl-content"><h4>4. In-Process Quality Checks</h4></div></div>
        <div class="q-tl-item q-tl-left"><div class="q-tl-content"><h4>5. Finished Product Testing</h4></div></div>
        <div class="q-tl-item q-tl-right"><div class="q-tl-content"><h4>6. Batch Review & Approval</h4></div></div>
        <div class="q-tl-item q-tl-left"><div class="q-tl-content"><h4>7. Packaging Verification</h4></div></div>
        <div class="q-tl-item q-tl-right"><div class="q-tl-content"><h4>8. Market Release</h4></div></div>
    </div>
</div>

<!-- 6. Regulatory & Packaging (SaaS Blocks) -->
<div class="q-saas-section">
    <!-- Block 1 -->
    <div class="q-saas-block">
        <div class="q-saas-title">
            <h3>Regulatory Compliance</h3>
            <p>We ensure compliance with applicable pharmaceutical regulations and quality guidelines through our manufacturing partnerships and internal quality systems.</p>
        </div>
        <div class="q-saas-list">
            <div class="q-saas-tag"><i class="fa fa-file-contract"></i> Good Manufacturing Practices (GMP)</div>
            <div class="q-saas-tag"><i class="fa fa-file-contract"></i> Product Documentation</div>
            <div class="q-saas-tag"><i class="fa fa-file-contract"></i> Pharmacovigilance Support</div>
            <div class="q-saas-tag"><i class="fa fa-file-contract"></i> Complaint Handling System</div>
            <div class="q-saas-tag"><i class="fa fa-file-contract"></i> Product Recall Readiness</div>
            <div class="q-saas-tag"><i class="fa fa-file-contract"></i> Regulatory Documentation Management</div>
            <div class="q-saas-tag"><i class="fa fa-file-contract"></i> Continuous Quality Improvement</div>
        </div>
    </div>
    
    <!-- Block 2 -->
    <div class="q-saas-block">
        <div class="q-saas-title">
            <h3>Packaging Quality</h3>
            <p>Product packaging plays a critical role in maintaining product integrity and patient safety.</p>
        </div>
        <div class="q-saas-list">
            <div class="q-saas-tag"><i class="fa fa-box"></i> Tamper-Evident Packaging</div>
            <div class="q-saas-tag"><i class="fa fa-box"></i> Accurate Labeling</div>
            <div class="q-saas-tag"><i class="fa fa-box"></i> Batch Traceability</div>
            <div class="q-saas-tag"><i class="fa fa-box"></i> Shelf-Life Protection</div>
            <div class="q-saas-tag"><i class="fa fa-box"></i> Transport Stability</div>
            <div class="q-saas-tag"><i class="fa fa-box"></i> Product Authentication Measures</div>
        </div>
    </div>
</div>

<!-- 7. Trust & Improvement (Awaken Overlap) -->
<div class="q-trust-section">
    <div class="q-trust-container">
        <img src="/assets/images/quality_trust.png" class="q-trust-img" alt="Healthcare Professionals">
        <div class="q-trust-box">
            <h3>Why Healthcare Professionals Trust Us</h3>
            <ul class="q-trust-list">
                <li><i>✔</i> Consistent Product Quality</li>
                <li><i>✔</i> Reliable Supply Chain</li>
                <li><i>✔</i> Ethical Business Practices</li>
                <li><i>✔</i> Strong Manufacturing Partnerships</li>
                <li><i>✔</i> Scientific Approach</li>
                <li><i>✔</i> Customer-Centric Service</li>
                <li><i>✔</i> Commitment to Patient Safety</li>
            </ul>
            
            <div class="q-improvement-card">
                <h4>Continuous Improvement</h4>
                <p>We believe quality is an ongoing journey. Through regular audits, performance monitoring, customer feedback, and process optimization, we continuously enhance our quality systems to meet evolving healthcare and regulatory expectations.</p>
            </div>
        </div>
    </div>
</div>

<!-- 8. Promise & Counters (Footer Style) -->
<div class="q-promise-section">
    <div class="q-promise-container">
        <div class="q-promise-quote">"Every product we offer reflects our commitment to quality, safety, efficacy, and trust—because better quality means better healthcare."</div>
        
        <div class="q-counters-grid">
            <div class="q-counter-card"><h4>100% Batch Traceability</h4></div>
            <div class="q-counter-card"><h4>Multi-Level Quality Checks</h4></div>
            <div class="q-counter-card"><h4>GMP-Compliant Manufacturing Partners</h4></div>
            <div class="q-counter-card"><h4>Stringent QA & QC Processes</h4></div>
            <div class="q-counter-card"><h4>Commitment to Global Quality Standards</h4></div>
        </div>
    </div>
</div>
`;

$('[data-elementor-type="wp-page"]').append(qualityHtml);

let finalHtml = $.html();
if (finalHtml.includes('<html><head>')) {
    finalHtml = finalHtml.replace(/<html><head>.*?<\/head><body>/s, '');
    finalHtml = finalHtml.replace(/<\/body><\/html>/, '');
}

fs.writeFileSync('src/content/bodies/quality.html', finalHtml);
console.log("Injected all 8 quality sections.");

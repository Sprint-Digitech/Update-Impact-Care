const fs = require('fs');
const cheerio = require('cheerio');

// 1. Rewrite CSS for the 3rd Section
let css = fs.readFileSync('src/styles/globals.css', 'utf8');

const newImpactCSS = `
/* 3. Impact Conclusion (Redesigned Awaken Style) */
.mfg-awaken-impact {
    font-family: 'Inter', sans-serif;
    background-color: #f8fafc;
    padding: 100px 20px;
}

.mfg-impact-container {
    max-width: 1200px;
    margin: 0 auto;
    background-image: url('/assets/uploads/2024/12/happy-client-img-1.jpg');
    background-size: cover;
    background-position: center;
    border-radius: 30px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 40px 80px rgba(0,0,0,0.15);
}

.mfg-impact-overlay {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background: linear-gradient(90deg, rgba(0, 184, 83, 0.95) 0%, rgba(0, 184, 83, 0.8) 50%, rgba(0, 184, 83, 0.1) 100%);
    z-index: 1;
}

.mfg-impact-content {
    position: relative;
    z-index: 2;
    max-width: 650px;
    padding: 80px 60px;
}

.mfg-impact-icon {
    width: 60px;
    height: 60px;
    background: #ffffff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #00b853;
    margin-bottom: 30px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.mfg-impact-icon svg { width: 30px; height: 30px; }

.mfg-impact-text {
    font-size: 26px;
    font-weight: 700;
    color: #ffffff;
    line-height: 1.6;
    font-style: italic;
    text-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

@media (max-width: 768px) {
    .mfg-impact-overlay { background: rgba(0, 184, 83, 0.9); }
    .mfg-impact-content { padding: 50px 30px; }
}
`;

// Replace old impact css block (this is a bit hacky, better to append and override)
// I will append it so it overrides the old .mfg-awaken-impact styles
css = css + '\n\n' + newImpactCSS;
fs.writeFileSync('src/styles/globals.css', css);


// 2. Fix HTML
let html = fs.readFileSync('src/content/bodies/manufacturing.html', 'utf8');
const $ = cheerio.load(html, { decodeEntities: false }, false);

// Delete the old mfg-page-wrapper completely
$('.mfg-page-wrapper').remove();

// Replace the 3rd section HTML
const newImpactHTML = `
<!-- Section 3: Impact Conclusion (Redesigned) -->
<div class="mfg-awaken-impact">
    <div class="mfg-impact-container">
        <div class="mfg-impact-overlay"></div>
        
        <div class="mfg-impact-content">
            <div class="mfg-impact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            </div>
            <p class="mfg-impact-text">
                "These strategic collaborations enable us to deliver pharmaceutical products that consistently meet high standards of quality, safety, and performance while ensuring dependable supply to our customers."
            </p>
        </div>
    </div>
</div>
`;

$('.mfg-awaken-impact').replaceWith(newImpactHTML);

let finalHtml = $.html();
if (finalHtml.includes('<html><head>')) {
    finalHtml = finalHtml.replace(/<html><head>.*?<\/head><body>/s, '');
    finalHtml = finalHtml.replace(/<\/body><\/html>/, '');
}

fs.writeFileSync('src/content/bodies/manufacturing.html', finalHtml);
console.log("Deleted .mfg-page-wrapper and completely redesigned the 3rd section.");

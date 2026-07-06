const fs = require('fs');
const cheerio = require('cheerio');

// 1. Rewrite CSS for the 3rd Section to be a Centered Banner
let css = fs.readFileSync('src/styles/globals.css', 'utf8');

const newImpactCSS = `
/* 3. Impact Conclusion (Centered Premium Banner) */
.mfg-awaken-impact {
    font-family: 'Inter', sans-serif;
    padding: 100px 20px;
    background-color: #ffffff;
}

.mfg-impact-container {
    max-width: 1200px;
    margin: 0 auto;
    background-image: url('/assets/uploads/2024/12/happy-client-img-1.jpg');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    border-radius: 30px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 40px 80px rgba(0,0,0,0.1);
    text-align: center;
    padding: 80px 40px;
}

.mfg-impact-overlay {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(15, 23, 42, 0.85); /* Deep dark blue overlay */
    z-index: 1;
}

.mfg-impact-content {
    position: relative;
    z-index: 2;
    max-width: 850px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.mfg-impact-icon {
    width: 70px;
    height: 70px;
    background: rgba(0, 184, 83, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #00b853; /* Brand Green */
    margin-bottom: 35px;
    border: 1px solid rgba(0, 184, 83, 0.5);
}

.mfg-impact-icon svg { width: 34px; height: 34px; }

.mfg-impact-text {
    font-size: 32px;
    font-weight: 300; /* Light, elegant weight */
    color: #ffffff;
    line-height: 1.6;
    font-style: italic;
}

@media (max-width: 768px) {
    .mfg-impact-container { padding: 60px 20px; }
    .mfg-impact-text { font-size: 24px; }
}
`;

// Regex replace the old .mfg-awaken-impact block up to the end of the file or next major section.
// A simpler way is to just append it and let it override, but to keep it clean, let's just append and use !important if necessary, or just append since it's at the end of the file.
// Actually, earlier we appended a block starting with "/* 3. Impact Conclusion (Redesigned Awaken Style) */"
// Let's replace everything from that comment to the end of the file.
const splitIndex = css.indexOf('/* 3. Impact Conclusion');
if (splitIndex !== -1) {
    css = css.substring(0, splitIndex);
}
css = css + '\n' + newImpactCSS;
fs.writeFileSync('src/styles/globals.css', css);


// 2. Fix HTML
let html = fs.readFileSync('src/content/bodies/manufacturing.html', 'utf8');
const $ = cheerio.load(html, { decodeEntities: false }, false);

const newImpactHTML = `
<!-- Section 3: Impact Conclusion (Centered Premium Banner) -->
<div class="mfg-awaken-impact">
    <div class="mfg-impact-container">
        <div class="mfg-impact-overlay"></div>
        
        <div class="mfg-impact-content">
            <div class="mfg-impact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
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
console.log("Redesigned the 3rd section to be a perfectly centered premium banner.");

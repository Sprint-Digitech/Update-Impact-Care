const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const bodiesDir = path.join(__dirname, 'src', 'content', 'bodies');

const newFaqHtml = `
<div class="faq-v2-section">
    <div class="faq-v2-container">
        
        <!-- Left: Accordion -->
        <div class="faq-v2-left">
            <div class="faq-v2-pill">Frequently Asked Question</div>
            <h2 class="faq-v2-heading">General Questions</h2>
            
            <div class="faq-v2-accordion">
                <details class="faq-v2-item" open>
                    <summary class="faq-v2-summary">
                        1. What does your company do?
                        <div class="faq-v2-icon"><i class="fa fa-chevron-down"></i></div>
                    </summary>
                    <div class="faq-v2-content">
                        We are a pharmaceutical company engaged in the marketing, distribution, and export of high-quality pharmaceutical, nutraceutical, herbal, and generic healthcare products. We work with reputed manufacturing partners to deliver reliable healthcare solutions across multiple therapeutic segments.
                    </div>
                </details>

                <details class="faq-v2-item">
                    <summary class="faq-v2-summary">
                        2. Which therapeutic segments do you serve?
                        <div class="faq-v2-icon"><i class="fa fa-chevron-down"></i></div>
                    </summary>
                    <div class="faq-v2-content">
                        Our current business divisions include:
                        <ul>
                            <li>General Medicine</li>
                            <li>Generic Division</li>
                            <li>Cardio-Diabetics</li>
                            <li>Critical Care</li>
                            <li>Pediatrics</li>
                            <li>Herbals</li>
                        </ul>
                        We are also expanding into additional specialty healthcare segments.
                    </div>
                </details>

                <details class="faq-v2-item">
                    <summary class="faq-v2-summary">
                        3. Do you manufacture your own products?
                        <div class="faq-v2-icon"><i class="fa fa-chevron-down"></i></div>
                    </summary>
                    <div class="faq-v2-content">
                        We collaborate with trusted pharmaceutical manufacturing partners that operate modern facilities and follow recognized quality standards. This partnership model enables us to offer a diverse portfolio while maintaining a strong focus on quality and customer service.
                    </div>
                </details>

                <details class="faq-v2-item">
                    <summary class="faq-v2-summary">
                        4. Are your products manufactured under GMP standards?
                        <div class="faq-v2-icon"><i class="fa fa-chevron-down"></i></div>
                    </summary>
                    <div class="faq-v2-content">
                        Yes. Our products are manufactured by reputed facilities operating under applicable GMP requirements and other quality systems as held by the respective manufacturing partners.
                    </div>
                </details>
            </div>
        </div>

        <!-- Right: Image -->
        <div class="faq-v2-right">
            <div class="faq-v2-image-wrapper">
                <img src="/assets/images/products_faq.png" alt="FAQ">
                <div class="faq-v2-float-card">
                    <div class="faq-v2-float-icon"><i class="fa fa-question-circle"></i></div>
                    <div class="faq-v2-float-text">Relax, We've Got the Answers</div>
                </div>
            </div>
        </div>
        
    </div>
</div>
`;

function processFile(filename) {
    const filePath = path.join(bodiesDir, filename);
    if (!fs.existsSync(filePath)) return;

    const html = fs.readFileSync(filePath, 'utf8');
    const $ = cheerio.load('<div id="dummy-root">' + html + '</div>', { decodeEntities: false }, false);

    // Remove any previously injected faq-v2-section to avoid duplicates
    $('.faq-v2-section').remove();

    // Insert before footer
    let footerSection = $('.ekit-template-content-footer');
    if (footerSection.length) {
        footerSection.before(newFaqHtml);
    } else {
        // Fallback: append to elementor-13 or dummy root
        let mainContent = $('.elementor-13');
        if (mainContent.length) {
            mainContent.append(newFaqHtml);
        } else {
            $('#dummy-root').append(newFaqHtml);
        }
    }

    let finalHtml = $('#dummy-root').html();
    fs.writeFileSync(filePath, finalHtml, 'utf8');
    console.log('Injected new FAQ into:', filename);
}

// Process home page files
const homeFiles = [
    'index.html',
    'home-image.html',
    'home-slider.html',
    'home-video.html',
    'home-main-backup.html'
];

for (const file of homeFiles) {
    processFile(file);
}

console.log("FAQ injection complete.");

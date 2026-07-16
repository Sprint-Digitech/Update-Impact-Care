const fs = require('fs');
const path = require('path');

const bodiesDir = path.join('src', 'content', 'bodies');
const files = fs.readdirSync(bodiesDir).filter(f => f.endsWith('.html'));

const socialReplacement = `<ul class="ekit_social_media">
					<li class="elementor-repeater-item-facebook">
					    <a href="https://www.facebook.com/profile.php?id=100065026601846" aria-label="Facebook" class="facebook" target="_blank">
							<i aria-hidden="true" class="icon icon-facebook"></i>
                        </a>
                    </li>
                    <li class="elementor-repeater-item-twitter">
					    <a href="https://x.com/ImpactHealthCPL" aria-label="Twitter" class="twitter" target="_blank">
							<i aria-hidden="true" class="fab fa-twitter"></i>
                        </a>
                    </li>
                    <li class="elementor-repeater-item-instagram">
					    <a href="https://www.instagram.com/impact.healthcare?igsh=MTI5ODUzNWFmYjNoYw==" aria-label="Instagram" class="instagram" target="_blank">
							<i aria-hidden="true" class="fab fa-instagram"></i>
                        </a>
                    </li>
                    <li class="elementor-repeater-item-linkedin">
					    <a href="https://www.linkedin.com/company/unavailable/" aria-label="LinkedIn" class="linkedin" target="_blank">
							<i aria-hidden="true" class="fab fa-linkedin-in"></i>
                        </a>
                    </li>
			</ul>`;

let updatedCount = 0;

for (const file of files) {
    const filePath = path.join(bodiesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // 1. Replace phone link hrefs
    const telRegex = /href="tel:[^"]+"/g;
    if (telRegex.test(content)) {
        content = content.replace(telRegex, 'href="tel:+919999976844"');
        modified = true;
    }

    // 2. Replace visible phone texts
    const phoneTexts = [
        '+1 (213) 465 789',
        '+01-787-582-568',
        '+91 - 123 456 7890',
        '+918595872604',
        '+(91) 8595-872-604'
    ];
    for (const phone of phoneTexts) {
        if (content.includes(phone)) {
            // Split and join is safer for global replace without regex escaping
            content = content.split(phone).join('+91 9999976844');
            modified = true;
        }
    }

    // 3. Replace footer social links
    // The footer social media ul block starts with <ul class="ekit_social_media"> and ends with </ul>
    const socialBlockRegex = /<ul class="ekit_social_media">[\s\S]*?<\/ul>/;
    if (socialBlockRegex.test(content)) {
        content = content.replace(socialBlockRegex, socialReplacement);
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        updatedCount++;
    }
}

console.log(`Successfully updated ${updatedCount} HTML files.`);

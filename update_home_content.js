const fs = require('fs');

const files = [
    'src/content/bodies/home-image.html',
    'src/content/bodies/home-video.html',
    'src/content/bodies/home-slider.html',
    'src/content/bodies/index.html'
];

files.forEach(file => {
    if (!fs.existsSync(file)) return;
    
    let content = fs.readFileSync(file, 'utf8');
    
    // First block
    content = content.replace(
        /50\+\s*Expert\s*Doctor\s*<\/span>[\s\S]*?Our team includes over 50 highly skilled doctors\.\s*<\/p>/g,
        `15,000+ Global Partners </span>
\t\t\t\t\t\t\t\t\t\t\t</h3>

\t\t\t\t\t\t\t\t\t\t\t<p class="elementor-icon-box-description">
\t\t\t\t\t\t\t\t\t\t\t\tTrusted by healthcare professionals across 50+ countries worldwide. </p>`
    );
    
    // Second block
    content = content.replace(
        /24\/7\s*Instant\s*Support\s*<\/span>[\s\S]*?Our team includes over 50 highly skilled doctors\.\s*<\/p>/g,
        `WHO-GMP Certified </span>
\t\t\t\t\t\t\t\t\t\t\t</h3>

\t\t\t\t\t\t\t\t\t\t\t<p class="elementor-icon-box-description">
\t\t\t\t\t\t\t\t\t\t\t\tEnsuring the highest international standards in pharmaceutical manufacturing. </p>`
    );
    
    // Third block
    content = content.replace(
        /Expert\s*Medical\s*Team\s*<\/span>[\s\S]*?Our team includes over 50 highly skilled doctors\.\s*<\/p>/g,
        `Wide Product Range </span>
\t\t\t\t\t\t\t\t\t\t\t</h3>

\t\t\t\t\t\t\t\t\t\t\t<p class="elementor-icon-box-description">
\t\t\t\t\t\t\t\t\t\t\t\tOffering diverse therapeutic segments including antibiotics, cardio, and NSAIDs. </p>`
    );
    
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
});

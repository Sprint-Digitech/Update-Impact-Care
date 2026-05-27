const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path');

const targetFiles = [
    'src/content/bodies/index.html',
    'src/content/bodies/home-image.html',
    'src/content/bodies/home-slider.html',
    'src/content/bodies/home-video.html'
];

const bgImagePath = '/assets/uploads/images/hero_3d_medicine_bg.png';

targetFiles.forEach(file => {
    const fullPath = path.resolve(__dirname, file);
    if (!fs.existsSync(fullPath)) {
        console.log(`Skipping ${file} - not found`);
        return;
    }

    const html = fs.readFileSync(fullPath, 'utf8');
    const $ = cheerio.load(html, { decodeEntities: false });
    
    let changed = false;
    
    const styleBlock = `
    <style id="custom-hero-bg">
        /* Force 3D Medicine Background on Hero Section */
        .elementor-element-437f651, 
        .hero-image-section,
        .bg-section.e-con-child[data-settings*="classic"] {
            background-image: url('${bgImagePath}') !important;
            background-size: cover !important;
            background-position: center !important;
            background-repeat: no-repeat !important;
        }
        
        /* Specific overrides for video and slider */
        .elementor-background-video-container {
            display: none !important;
        }
        .swiper-slide {
            background-image: url('${bgImagePath}') !important;
            background-size: cover !important;
            background-position: center !important;
        }
        .elementor-widget-video {
            display: none !important;
        }
        
        /* Dimming overlay so text is readable */
        .hero-overlay-dark {
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0, 15, 30, 0.4) !important;
            z-index: 0;
            pointer-events: none;
        }
        .elementor-element-ac92a47 .e-con-inner {
            position: relative;
            z-index: 1;
        }
    </style>
    `;

    if ($('#custom-hero-bg').length === 0) {
        $('head').append(styleBlock);
        changed = true;
    } else {
        $('#custom-hero-bg').replaceWith(styleBlock);
        changed = true;
    }

    // Add overlay div if it doesn't exist
    const heroBgSection = $('.elementor-element-437f651');
    if (heroBgSection.length > 0 && heroBgSection.find('.hero-overlay-dark').length === 0) {
        heroBgSection.prepend('<div class="hero-overlay-dark"></div>');
        heroBgSection.css('position', 'relative');
        changed = true;
    }

    if (file.includes('home-video.html')) {
        $('.elementor-widget-video, .elementor-background-video-container').css('display', 'none');
    }
    
    if (file.includes('home-slider.html')) {
        $('.swiper-slide-bg').css('background-image', `url('${bgImagePath}')`);
        $('.swiper-slide-image').attr('src', bgImagePath);
    }

    if (changed) {
        fs.writeFileSync(fullPath, $.html(), 'utf8');
        console.log(`Updated hero background for ${file}`);
    }
});

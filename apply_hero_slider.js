const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'content', 'bodies', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

const heroStart = '<div class="elementor-element elementor-element-bef7d76 e-flex e-con-full e-con e-parent"';
const heroEnd = '<!-- Stats Banner Container (Injected) -->';

const startIndex = html.indexOf(heroStart);
const endIndex = html.indexOf(heroEnd);

if (startIndex !== -1 && endIndex !== -1) {
    const newHeroHTML = `<!-- New Image Slider Hero Section -->
<div class="hero-slider-section" style="position: relative; width: 100%; height: 600px; overflow: hidden; background: #000;">
    <div class="hero-slider-container" id="hero-slider" style="width: 100%; height: 100%; position: relative;">
        
        <!-- Slide 1 -->
        <div class="hero-slide active" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 1; transition: opacity 0.8s ease-in-out; z-index: 1;">
            <div class="hero-slide-bg" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: url('/assets/images/genlab_scientist.png'); background-size: cover; background-position: center;"></div>
            <div class="hero-slide-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(90deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,0) 100%);"></div>
            
            <div class="hero-slide-content" style="position: relative; z-index: 2; display: flex; flex-direction: column; justify-content: center; height: 100%; max-width: 1200px; margin: 0 auto; padding: 0 20px;">
                <h1 class="hero-title" style="font-size: clamp(36px, 5vw, 60px); font-weight: 800; line-height: 1.1; margin-bottom: 20px; font-family: 'Inter', sans-serif;">
                    <span style="color: #0d2657;">Delivering Quality Medicines</span><br>
                    <span style="color: #1a7f37;">Improving Global Lives</span>
                </h1>
                <p class="hero-desc" style="font-size: 18px; color: #4b5563; font-weight: 500; line-height: 1.6; max-width: 600px; margin-bottom: 40px; font-family: 'Inter', sans-serif;">
                    A research-driven pharmaceutical company delivering<br>high-quality, affordable medicines trusted in<br>over 50+ countries worldwide.
                </p>
                <div class="hero-buttons" style="display: flex; gap: 20px; align-items: center;">
                    <a href="/products/" style="display: inline-flex; align-items: center; justify-content: center; background-color: #0d2657; color: #ffffff; padding: 15px 30px; border-radius: 6px; font-weight: 600; font-family: 'Inter', sans-serif; text-decoration: none; font-size: 14px; letter-spacing: 0.5px; transition: all 0.3s ease;">
                        OUR PRODUCTS 
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 10px;">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 16 16 12 12 8"></polyline>
                            <line x1="8" y1="12" x2="16" y2="12"></line>
                        </svg>
                    </a>
                    <a href="/about-us/" style="display: inline-flex; align-items: center; justify-content: center; background-color: #ffffff; color: #0d2657; border: 1px solid #c9d2d9; padding: 14px 30px; border-radius: 6px; font-weight: 600; font-family: 'Inter', sans-serif; text-decoration: none; font-size: 14px; letter-spacing: 0.5px; transition: all 0.3s ease;">
                        ABOUT US
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 10px;">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 16 16 12 12 8"></polyline>
                            <line x1="8" y1="12" x2="16" y2="12"></line>
                        </svg>
                    </a>
                </div>
            </div>
        </div>

        <!-- Slide 2 -->
        <div class="hero-slide" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; transition: opacity 0.8s ease-in-out; z-index: 0;">
            <div class="hero-slide-bg" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: url('/assets/images/rd-hero-banner.png'); background-size: cover; background-position: center;"></div>
            <div class="hero-slide-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(90deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,0) 100%);"></div>
            
            <div class="hero-slide-content" style="position: relative; z-index: 2; display: flex; flex-direction: column; justify-content: center; height: 100%; max-width: 1200px; margin: 0 auto; padding: 0 20px;">
                <h1 class="hero-title" style="font-size: clamp(36px, 5vw, 60px); font-weight: 800; line-height: 1.1; margin-bottom: 20px; font-family: 'Inter', sans-serif;">
                    <span style="color: #0d2657;">Pioneering Research</span><br>
                    <span style="color: #1a7f37;">For a Healthier Tomorrow</span>
                </h1>
                <p class="hero-desc" style="font-size: 18px; color: #4b5563; font-weight: 500; line-height: 1.6; max-width: 600px; margin-bottom: 40px; font-family: 'Inter', sans-serif;">
                    Developing innovative solutions and advanced<br>therapeutics to improve patient outcomes globally.
                </p>
                <div class="hero-buttons" style="display: flex; gap: 20px; align-items: center;">
                    <a href="/products/" style="display: inline-flex; align-items: center; justify-content: center; background-color: #0d2657; color: #ffffff; padding: 15px 30px; border-radius: 6px; font-weight: 600; font-family: 'Inter', sans-serif; text-decoration: none; font-size: 14px; letter-spacing: 0.5px; transition: all 0.3s ease;">
                        OUR PRODUCTS 
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 10px;"><circle cx="12" cy="12" r="10"></circle><polyline points="12 16 16 12 12 8"></polyline><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                    </a>
                    <a href="/about-us/" style="display: inline-flex; align-items: center; justify-content: center; background-color: #ffffff; color: #0d2657; border: 1px solid #c9d2d9; padding: 14px 30px; border-radius: 6px; font-weight: 600; font-family: 'Inter', sans-serif; text-decoration: none; font-size: 14px; letter-spacing: 0.5px; transition: all 0.3s ease;">
                        ABOUT US
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 10px;"><circle cx="12" cy="12" r="10"></circle><polyline points="12 16 16 12 12 8"></polyline><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                    </a>
                </div>
            </div>
        </div>

        <!-- Slide 3 -->
        <div class="hero-slide" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; transition: opacity 0.8s ease-in-out; z-index: 0;">
            <div class="hero-slide-bg" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: url('/assets/images/genlab_equipment.png'); background-size: cover; background-position: center;"></div>
            <div class="hero-slide-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(90deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,0) 100%);"></div>
            
            <div class="hero-slide-content" style="position: relative; z-index: 2; display: flex; flex-direction: column; justify-content: center; height: 100%; max-width: 1200px; margin: 0 auto; padding: 0 20px;">
                <h1 class="hero-title" style="font-size: clamp(36px, 5vw, 60px); font-weight: 800; line-height: 1.1; margin-bottom: 20px; font-family: 'Inter', sans-serif;">
                    <span style="color: #0d2657;">State-of-the-Art</span><br>
                    <span style="color: #1a7f37;">Manufacturing Facilities</span>
                </h1>
                <p class="hero-desc" style="font-size: 18px; color: #4b5563; font-weight: 500; line-height: 1.6; max-width: 600px; margin-bottom: 40px; font-family: 'Inter', sans-serif;">
                    WHO-GMP certified facilities equipped with the<br>latest technology to ensure highest quality standards.
                </p>
                <div class="hero-buttons" style="display: flex; gap: 20px; align-items: center;">
                    <a href="/products/" style="display: inline-flex; align-items: center; justify-content: center; background-color: #0d2657; color: #ffffff; padding: 15px 30px; border-radius: 6px; font-weight: 600; font-family: 'Inter', sans-serif; text-decoration: none; font-size: 14px; letter-spacing: 0.5px; transition: all 0.3s ease;">
                        OUR PRODUCTS 
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 10px;"><circle cx="12" cy="12" r="10"></circle><polyline points="12 16 16 12 12 8"></polyline><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                    </a>
                    <a href="/about-us/" style="display: inline-flex; align-items: center; justify-content: center; background-color: #ffffff; color: #0d2657; border: 1px solid #c9d2d9; padding: 14px 30px; border-radius: 6px; font-weight: 600; font-family: 'Inter', sans-serif; text-decoration: none; font-size: 14px; letter-spacing: 0.5px; transition: all 0.3s ease;">
                        ABOUT US
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 10px;"><circle cx="12" cy="12" r="10"></circle><polyline points="12 16 16 12 12 8"></polyline><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                    </a>
                </div>
            </div>
        </div>

        <!-- Slide 4 -->
        <div class="hero-slide" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; transition: opacity 0.8s ease-in-out; z-index: 0;">
            <div class="hero-slide-bg" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: url('/assets/images/quality-hero-banner.png'); background-size: cover; background-position: center;"></div>
            <div class="hero-slide-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(90deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,0) 100%);"></div>
            
            <div class="hero-slide-content" style="position: relative; z-index: 2; display: flex; flex-direction: column; justify-content: center; height: 100%; max-width: 1200px; margin: 0 auto; padding: 0 20px;">
                <h1 class="hero-title" style="font-size: clamp(36px, 5vw, 60px); font-weight: 800; line-height: 1.1; margin-bottom: 20px; font-family: 'Inter', sans-serif;">
                    <span style="color: #0d2657;">Uncompromising</span><br>
                    <span style="color: #1a7f37;">Commitment to Quality</span>
                </h1>
                <p class="hero-desc" style="font-size: 18px; color: #4b5563; font-weight: 500; line-height: 1.6; max-width: 600px; margin-bottom: 40px; font-family: 'Inter', sans-serif;">
                    Rigorous quality control processes at every stage<br>to ensure the safety and efficacy of our products.
                </p>
                <div class="hero-buttons" style="display: flex; gap: 20px; align-items: center;">
                    <a href="/products/" style="display: inline-flex; align-items: center; justify-content: center; background-color: #0d2657; color: #ffffff; padding: 15px 30px; border-radius: 6px; font-weight: 600; font-family: 'Inter', sans-serif; text-decoration: none; font-size: 14px; letter-spacing: 0.5px; transition: all 0.3s ease;">
                        OUR PRODUCTS 
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 10px;"><circle cx="12" cy="12" r="10"></circle><polyline points="12 16 16 12 12 8"></polyline><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                    </a>
                    <a href="/about-us/" style="display: inline-flex; align-items: center; justify-content: center; background-color: #ffffff; color: #0d2657; border: 1px solid #c9d2d9; padding: 14px 30px; border-radius: 6px; font-weight: 600; font-family: 'Inter', sans-serif; text-decoration: none; font-size: 14px; letter-spacing: 0.5px; transition: all 0.3s ease;">
                        ABOUT US
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 10px;"><circle cx="12" cy="12" r="10"></circle><polyline points="12 16 16 12 12 8"></polyline><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                    </a>
                </div>
            </div>
        </div>

        <!-- Navigation Arrows -->
        <button class="hero-nav-btn hero-nav-prev" onclick="moveSlide(-1)" style="position: absolute; left: 20px; top: 50%; transform: translateY(-50%); z-index: 10; width: 40px; height: 40px; border-radius: 50%; background: #ffffff; border: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0d2657" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <button class="hero-nav-btn hero-nav-next" onclick="moveSlide(1)" style="position: absolute; right: 20px; top: 50%; transform: translateY(-50%); z-index: 10; width: 40px; height: 40px; border-radius: 50%; background: #ffffff; border: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0d2657" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>

        <!-- Dots -->
        <div class="hero-dots" style="position: absolute; bottom: 30px; left: 50%; transform: translateX(-50%); z-index: 10; display: flex; gap: 8px;">
            <span class="hero-dot active" onclick="currentSlide(1)" style="width: 10px; height: 10px; border-radius: 50%; background: #1a7f37; cursor: pointer; transition: all 0.3s ease;"></span>
            <span class="hero-dot" onclick="currentSlide(2)" style="width: 10px; height: 10px; border-radius: 50%; background: rgba(13, 38, 87, 0.5); cursor: pointer; transition: all 0.3s ease;"></span>
            <span class="hero-dot" onclick="currentSlide(3)" style="width: 10px; height: 10px; border-radius: 50%; background: rgba(13, 38, 87, 0.5); cursor: pointer; transition: all 0.3s ease;"></span>
            <span class="hero-dot" onclick="currentSlide(4)" style="width: 10px; height: 10px; border-radius: 50%; background: rgba(13, 38, 87, 0.5); cursor: pointer; transition: all 0.3s ease;"></span>
        </div>
    </div>
</div>

<script>
    let slideIndex = 1;
    let slideInterval;

    function showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("hero-slide");
        let dots = document.getElementsByClassName("hero-dot");
        
        if (slides.length === 0) return;

        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        
        for (i = 0; i < slides.length; i++) {
            slides[i].classList.remove("active");
            slides[i].style.opacity = "0";
            slides[i].style.zIndex = "0";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].classList.remove("active");
            dots[i].style.background = "rgba(13, 38, 87, 0.5)";
        }
        
        slides[slideIndex-1].classList.add("active");
        setTimeout(() => {
            slides[slideIndex-1].style.opacity = "1";
            slides[slideIndex-1].style.zIndex = "1";
        }, 50);
        dots[slideIndex-1].classList.add("active");
        dots[slideIndex-1].style.background = "#1a7f37";
    }

    function moveSlide(n) {
        showSlides(slideIndex += n);
        resetInterval();
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
        resetInterval();
    }

    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(function() { moveSlide(1); }, 5000);
    }

    document.addEventListener("DOMContentLoaded", function() {
        showSlides(slideIndex);
        slideInterval = setInterval(function() { moveSlide(1); }, 5000);
        
        // Add hover effects for buttons
        const navBtns = document.querySelectorAll('.hero-nav-btn');
        navBtns.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.background = '#f1f5f9';
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.background = '#ffffff';
            });
        });
        
        const heroBtns = document.querySelectorAll('.hero-btn');
        heroBtns.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                if(btn.style.backgroundColor === 'rgb(13, 38, 87)') {
                    btn.style.backgroundColor = '#0a1d42';
                } else {
                    btn.style.backgroundColor = '#f1f5f9';
                }
            });
            btn.addEventListener('mouseleave', () => {
                if(btn.style.backgroundColor === 'rgb(10, 29, 66)' || btn.style.backgroundColor === '#0a1d42') {
                    btn.style.backgroundColor = '#0d2657';
                } else {
                    btn.style.backgroundColor = '#ffffff';
                }
            });
        });
    });
</script>
\n`;

    const finalHTML = html.substring(0, startIndex) + newHeroHTML + html.substring(endIndex);
    fs.writeFileSync(filePath, finalHTML, 'utf8');
    console.log('Successfully updated the hero section in index.html');
} else {
    console.log('Could not find the target strings in index.html to replace.');
}

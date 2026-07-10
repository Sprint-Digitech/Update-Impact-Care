const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'content', 'bodies', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

const heroStart = '<!-- New Image Slider Hero Section -->';
const heroEnd = '<!-- Stats Banner Container (Injected) -->';

const startIndex = html.indexOf(heroStart);
const endIndex = html.indexOf(heroEnd);

if (startIndex !== -1 && endIndex !== -1) {
    const newHeroHTML = `<!-- New Image Slider Hero Section -->
<style>
    .hero-slider-section {
        position: relative;
        width: 100%;
        height: 600px;
        overflow: hidden;
        background: #000;
        font-family: 'Inter', sans-serif;
    }
    .hero-slider-container {
        width: 100%;
        height: 100%;
        position: relative;
    }
    .hero-slide {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        z-index: 0;
        animation: fade 20s infinite;
    }
    .hero-slide:nth-child(1) {
        animation-delay: 0s;
    }
    .hero-slide:nth-child(2) {
        animation-delay: 5s;
    }
    .hero-slide:nth-child(3) {
        animation-delay: 10s;
    }
    .hero-slide:nth-child(4) {
        animation-delay: 15s;
    }
    
    @keyframes fade {
        0%, 20% { opacity: 1; z-index: 1; }
        25%, 95% { opacity: 0; z-index: 0; }
        100% { opacity: 1; z-index: 1; }
    }

    .hero-slide-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center top;
    }
    .hero-slide-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.85) 45%, rgba(255,255,255,0) 100%);
    }
    .hero-slide-content {
        position: relative;
        z-index: 2;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 100px; /* Increased padding to prevent overlap with arrows */
    }
    .hero-title {
        font-size: clamp(32px, 4.5vw, 56px);
        font-weight: 800;
        line-height: 1.15;
        margin-bottom: 20px;
        color: #0b1c3c;
    }
    .hero-title-green {
        color: #1b853f;
    }
    .hero-desc {
        font-size: 18px;
        color: #4b5563;
        font-weight: 500;
        line-height: 1.6;
        max-width: 650px;
        margin-bottom: 40px;
    }
    .hero-buttons {
        display: flex;
        gap: 20px;
        align-items: center;
        flex-wrap: wrap;
    }
    .hero-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 14px 28px;
        border-radius: 6px;
        font-weight: 600;
        text-decoration: none;
        font-size: 14px;
        letter-spacing: 0.5px;
        transition: all 0.3s ease;
    }
    .hero-btn-primary {
        background-color: #0b1c3c;
        color: #ffffff;
        border: 2px solid #0b1c3c;
    }
    .hero-btn-primary:hover {
        background-color: #08152e;
        border-color: #08152e;
    }
    .hero-btn-secondary {
        background-color: #ffffff;
        color: #0b1c3c;
        border: 2px solid #e2e8f0;
    }
    .hero-btn-secondary:hover {
        border-color: #0b1c3c;
    }
    .hero-btn-icon {
        margin-left: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    /* Arrows and Dots */
    .hero-nav-btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 10;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #ffffff;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15); /* Stronger shadow, no border */
        pointer-events: none; /* purely decorative for CSS slider */
    }
    .hero-nav-prev { left: 20px; }
    .hero-nav-next { right: 20px; }
    
    .hero-dots {
        position: absolute;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 10;
        display: flex;
        gap: 8px;
        align-items: center;
    }
    .hero-dot {
        width: 10px;
        height: 10px;
        border-radius: 12px;
        background: rgba(148, 163, 184, 0.8); /* Grey */
        transition: all 0.3s ease;
        animation: dot-active 20s infinite;
    }
    .hero-dot:nth-child(1) { animation-delay: 0s; }
    .hero-dot:nth-child(2) { animation-delay: 5s; }
    .hero-dot:nth-child(3) { animation-delay: 10s; }
    .hero-dot:nth-child(4) { animation-delay: 15s; }
    
    @keyframes dot-active {
        0%, 20% { width: 24px; background: #1b853f; } /* Green Pill */
        25%, 100% { width: 10px; background: rgba(148, 163, 184, 0.8); } /* Grey circle */
    }
    
    /* Make the svg stroke clear and bold */
    .hero-nav-btn svg {
        stroke: #0b1c3c;
        stroke-width: 2.5;
    }
</style>

<div class="hero-slider-section">
    <div class="hero-slider-container">
        
        <!-- Slide 1 -->
        <div class="hero-slide">
            <div class="hero-slide-bg" style="background-image: url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2000&auto=format&fit=crop');"></div>
            <div class="hero-slide-overlay"></div>
            
            <div class="hero-slide-content">
                <h1 class="hero-title">
                    Delivering Quality Medicines<br>
                    <span class="hero-title-green">Improving Global Lives</span>
                </h1>
                <p class="hero-desc">
                    A research-driven pharmaceutical company delivering<br>high-quality, affordable medicines trusted in<br>over 50+ countries worldwide.
                </p>
                <div class="hero-buttons">
                    <a href="/products/" class="hero-btn hero-btn-primary">
                        OUR PRODUCTS 
                        <span class="hero-btn-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 16 16 12 12 8"></polyline>
                                <line x1="8" y1="12" x2="16" y2="12"></line>
                            </svg>
                        </span>
                    </a>
                    <a href="/about-us/" class="hero-btn hero-btn-secondary">
                        ABOUT US
                        <span class="hero-btn-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 16 16 12 12 8"></polyline>
                                <line x1="8" y1="12" x2="16" y2="12"></line>
                            </svg>
                        </span>
                    </a>
                </div>
            </div>
        </div>

        <!-- Slide 2 -->
        <div class="hero-slide">
            <div class="hero-slide-bg" style="background-image: url('/assets/images/rd-hero-banner.png');"></div>
            <div class="hero-slide-overlay"></div>
            
            <div class="hero-slide-content">
                <h1 class="hero-title">
                    Delivering Quality Medicines<br>
                    <span class="hero-title-green">Improving Global Lives</span>
                </h1>
                <p class="hero-desc">
                    A research-driven pharmaceutical company delivering<br>high-quality, affordable medicines trusted in<br>over 50+ countries worldwide.
                </p>
                <div class="hero-buttons">
                    <a href="/products/" class="hero-btn hero-btn-primary">
                        OUR PRODUCTS 
                        <span class="hero-btn-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 16 16 12 12 8"></polyline><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                        </span>
                    </a>
                    <a href="/about-us/" class="hero-btn hero-btn-secondary">
                        ABOUT US
                        <span class="hero-btn-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 16 16 12 12 8"></polyline><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                        </span>
                    </a>
                </div>
            </div>
        </div>

        <!-- Slide 3 -->
        <div class="hero-slide">
            <div class="hero-slide-bg" style="background-image: url('/assets/images/genlab_equipment.png');"></div>
            <div class="hero-slide-overlay"></div>
            
            <div class="hero-slide-content">
                <h1 class="hero-title">
                    Delivering Quality Medicines<br>
                    <span class="hero-title-green">Improving Global Lives</span>
                </h1>
                <p class="hero-desc">
                    A research-driven pharmaceutical company delivering<br>high-quality, affordable medicines trusted in<br>over 50+ countries worldwide.
                </p>
                <div class="hero-buttons">
                    <a href="/products/" class="hero-btn hero-btn-primary">
                        OUR PRODUCTS 
                        <span class="hero-btn-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 16 16 12 12 8"></polyline><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                        </span>
                    </a>
                    <a href="/about-us/" class="hero-btn hero-btn-secondary">
                        ABOUT US
                        <span class="hero-btn-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 16 16 12 12 8"></polyline><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                        </span>
                    </a>
                </div>
            </div>
        </div>

        <!-- Slide 4 -->
        <div class="hero-slide">
            <div class="hero-slide-bg" style="background-image: url('/assets/images/quality-hero-banner.png');"></div>
            <div class="hero-slide-overlay"></div>
            
            <div class="hero-slide-content">
                <h1 class="hero-title">
                    Delivering Quality Medicines<br>
                    <span class="hero-title-green">Improving Global Lives</span>
                </h1>
                <p class="hero-desc">
                    A research-driven pharmaceutical company delivering<br>high-quality, affordable medicines trusted in<br>over 50+ countries worldwide.
                </p>
                <div class="hero-buttons">
                    <a href="/products/" class="hero-btn hero-btn-primary">
                        OUR PRODUCTS 
                        <span class="hero-btn-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 16 16 12 12 8"></polyline><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                        </span>
                    </a>
                    <a href="/about-us/" class="hero-btn hero-btn-secondary">
                        ABOUT US
                        <span class="hero-btn-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 16 16 12 12 8"></polyline><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                        </span>
                    </a>
                </div>
            </div>
        </div>

        <!-- Navigation Arrows -->
        <div class="hero-nav-btn hero-nav-prev">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </div>
        <div class="hero-nav-btn hero-nav-next">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </div>

        <!-- Dots -->
        <div class="hero-dots">
            <span class="hero-dot"></span>
            <span class="hero-dot"></span>
            <span class="hero-dot"></span>
            <span class="hero-dot"></span>
        </div>
    </div>
</div>
\n`;

    const finalHTML = html.substring(0, startIndex) + newHeroHTML + html.substring(endIndex);
    fs.writeFileSync(filePath, finalHTML, 'utf8');
    console.log('Successfully updated the hero section in index.html with fixes');
} else {
    console.log('Could not find the target strings in index.html to replace.');
}

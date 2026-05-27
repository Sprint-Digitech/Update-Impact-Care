const fs = require('fs');
const cheerio = require('cheerio');

const htmlPath = 'src/content/bodies/manufacturing.html';
const html = fs.readFileSync(htmlPath, 'utf8');
const $ = cheerio.load(html, { decodeEntities: false });

// Rebuild the layout to be clean and full-width where appropriate.
// We will replace the entire content block (.elementor-element-6e38495) with properly structured Elementor blocks.

const newContent = `
<!-- Main Wrapper -->
<div class="mfg-page-wrapper" style="width: 100%; display: flex; flex-direction: column; gap: 80px; padding-bottom: 80px;">

    <!-- Section 1: Quality Assurance -->
    <div class="elementor-element e-flex e-con-boxed e-con e-parent" style="margin-top: 40px;">
        <div class="e-con-inner mfg-grid-container" style="display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; width: 100%;">
            <div class="mfg-image-wrapper">
                <img src="/assets/uploads/images/pharma_quality_control.png" alt="Pharma Quality Control" style="width: 100%; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
            </div>
            <div class="mfg-text-wrapper">
                <h3 style="color: #00a99d; font-size: 18px; font-weight: 600; text-transform: uppercase; margin-bottom: 10px; font-family: var(--e-global-typography-primary-font-family);">Quality Assurance</h3>
                <h2 style="font-size: 36px; font-weight: 700; color: #222; margin-bottom: 25px; line-height: 1.2; font-family: var(--e-global-typography-primary-font-family);">Built on quality at every stage</h2>
                <p style="font-size: 16px; color: #555; line-height: 1.8; text-align: justify; font-family: var(--e-global-typography-text-font-family);">
                    <strong>Impact Health Care - Medicine manufacturing Company.</strong><br><br>
                    We believe that continuously attaining high levels of quality in all we do is essential for strengthening the foundation of a responsible brand. Each stage of our operations, including purchasing, production, transportation, and safe product disposal, is infused with quality.<br><br>
                    The previous few years have been devoted to improving our QMS to successfully meet and surpass the demands of many regulatory agencies, including the US FDA, MHRA, TGA, MCC, and WHO. To guarantee quality, the Quality Control (QC) team develops and puts into effect strict procedures during the manufacturing process. Post-manufacturing, strict pharmacovigilance and destruction of faulty and expired items enhance the quality of products.
                </p>
            </div>
        </div>
    </div>

    <!-- Section 2: Maintaining Quality -->
    <div class="elementor-element e-flex e-con-boxed e-con e-parent">
        <div class="e-con-inner mfg-grid-container reverse" style="display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; width: 100%;">
            <div class="mfg-text-wrapper" style="grid-column: 1;">
                <h2 style="font-size: 36px; font-weight: 700; color: #222; margin-bottom: 25px; line-height: 1.2; font-family: var(--e-global-typography-primary-font-family);">Maintaining Quality</h2>
                <p style="font-size: 16px; color: #555; line-height: 1.8; text-align: justify; font-family: var(--e-global-typography-text-font-family);">
                    We believe that making sufficient and prompt investments to improve our quality management procedures will pay off in the long run by reducing the cost of failure and supporting legal compliance.<br><br>
                    The cutting-edge production facilities adhere to both national and international standards and are cGMP compliant. The Impact Quality Control Laboratories have finished the first phase of the Laboratory Information Management System (LIMS), which greatly enhances data management.<br><br>
                    Our facilities maintain quality by using industry best practices, adopting the latest technologies, and renewing their equipment regularly. We built an effective framework to produce goods that meet demanding requirements and in-process inspections, which leads to superior product quality.
                </p>
            </div>
            <div class="mfg-image-wrapper" style="grid-column: 2;">
                <img src="/assets/uploads/images/pharma_production_line.png" alt="Pharma Production Line" style="width: 100%; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
            </div>
        </div>
    </div>

    <!-- Section 3: Tests Conducted (Full Width Banner) -->
    <div class="elementor-element e-flex e-con-boxed e-con e-parent" style="background-color: #f8fbfa; padding: 60px 0; border-radius: 12px; width: 90%; max-width: 1140px; margin: 0 auto;">
        <div class="e-con-inner" style="display: flex; flex-direction: column; align-items: center; text-align: center; width: 100%;">
            <h2 style="font-size: 32px; font-weight: 700; color: #222; margin-bottom: 40px; font-family: var(--e-global-typography-primary-font-family);">Tests Conducted By The Impact Quality Control Team</h2>
            <div style="display: flex; justify-content: center; gap: 40px; flex-wrap: wrap;">
                <div style="display: flex; align-items: center; background: white; padding: 15px 30px; border-radius: 50px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                    <i class="fas fa-check-circle" style="color: #00a99d; font-size: 24px; margin-right: 15px;"></i>
                    <span style="font-size: 18px; font-weight: 600; color: #444;">Purity</span>
                </div>
                <div style="display: flex; align-items: center; background: white; padding: 15px 30px; border-radius: 50px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                    <i class="fas fa-check-circle" style="color: #00a99d; font-size: 24px; margin-right: 15px;"></i>
                    <span style="font-size: 18px; font-weight: 600; color: #444;">Effective Products</span>
                </div>
                <div style="display: flex; align-items: center; background: white; padding: 15px 30px; border-radius: 50px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                    <i class="fas fa-check-circle" style="color: #00a99d; font-size: 24px; margin-right: 15px;"></i>
                    <span style="font-size: 18px; font-weight: 600; color: #444;">Toxicity</span>
                </div>
                <div style="display: flex; align-items: center; background: white; padding: 15px 30px; border-radius: 50px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                    <i class="fas fa-check-circle" style="color: #00a99d; font-size: 24px; margin-right: 15px;"></i>
                    <span style="font-size: 18px; font-weight: 600; color: #444;">Composition</span>
                </div>
            </div>
        </div>
    </div>

    <!-- Section 4: R&D, Satisfaction, Certifications (Grid of 3) -->
    <div class="elementor-element e-flex e-con-boxed e-con e-parent">
        <div class="e-con-inner" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px; width: 100%;">
            
            <!-- R&D Box -->
            <div style="background: white; border: 1px solid #eee; border-radius: 12px; padding: 40px; text-align: center; box-shadow: 0 5px 20px rgba(0,0,0,0.03); transition: transform 0.3s ease;" class="hover-box">
                <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #00a99d, #0d827a); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 25px;">
                    <i class="fas fa-flask" style="color: white; font-size: 32px;"></i>
                </div>
                <h3 style="font-size: 24px; font-weight: 700; color: #222; margin-bottom: 20px; font-family: var(--e-global-typography-primary-font-family);">R&D</h3>
                <p style="font-size: 15px; color: #666; line-height: 1.7; font-family: var(--e-global-typography-text-font-family);">
                    Our research is incredibly fast, transparent and focused on succeeding in a competitive atmosphere when it comes to providing care for people. An external community network of over 200+ academic and 100 industry alliances centres around the area of shared scientific interest. The R&D works in a drug-safe environment to provide medicines for diseases across the world from the common cold to the rarest and most contagious disease.
                </p>
            </div>

            <!-- Client Satisfaction Box -->
            <div style="background: white; border: 1px solid #eee; border-radius: 12px; padding: 40px; text-align: center; box-shadow: 0 5px 20px rgba(0,0,0,0.03); transition: transform 0.3s ease;" class="hover-box">
                <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #00a99d, #0d827a); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 25px;">
                    <i class="fas fa-smile" style="color: white; font-size: 32px;"></i>
                </div>
                <h3 style="font-size: 24px; font-weight: 700; color: #222; margin-bottom: 20px; font-family: var(--e-global-typography-primary-font-family);">Client Satisfaction</h3>
                <p style="font-size: 15px; color: #666; line-height: 1.7; font-family: var(--e-global-typography-text-font-family);">
                    Definitely to care and cure is not a business for us. Our client's satisfaction and the potential we find to support and save the lives of patients is more valued in Impact Health care than profit and digits. We strongly pride ourselves in bringing a systematic, safe and Impactful medicational service to the clients. The Quality Control Department is independent and is under the authority of competent team with years of experience and qualification.
                </p>
            </div>

            <!-- Certifications Box -->
            <div style="background: white; border: 1px solid #eee; border-radius: 12px; padding: 40px; text-align: center; box-shadow: 0 5px 20px rgba(0,0,0,0.03); transition: transform 0.3s ease;" class="hover-box">
                <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #00a99d, #0d827a); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 25px;">
                    <i class="fas fa-certificate" style="color: white; font-size: 32px;"></i>
                </div>
                <h3 style="font-size: 24px; font-weight: 700; color: #222; margin-bottom: 20px; font-family: var(--e-global-typography-primary-font-family);">Certifications</h3>
                <p style="font-size: 15px; color: #666; line-height: 1.7; font-family: var(--e-global-typography-text-font-family);">
                    ISO and WHO-GMP certifications help ensure our standards stay aligned with global requirements and quality expectations.
                </p>
            </div>

        </div>
    </div>

    <!-- Section 5: Get Free Quote -->
    <div class="elementor-element e-flex e-con-boxed e-con e-parent" style="margin-top: 20px;">
        <div class="e-con-inner" style="display: flex; flex-direction: column; align-items: center; text-align: center; width: 100%;">
            <h4 style="font-size: 24px; color: #333; margin-bottom: 10px; font-family: var(--e-global-typography-primary-font-family);">Free</h4>
            <p style="font-size: 18px; color: #555; font-family: var(--e-global-typography-text-font-family);">Let's make something great work together. <a href="/contact-us/" style="color: #00a99d; text-decoration: underline; font-weight: 600;">Get Free Quote</a></p>
        </div>
    </div>

</div>
`;

// Find the original giant wrapper and replace it
const target = $('.elementor-element-6e38495');
if (target.length > 0) {
    target.replaceWith(newContent);
    fs.writeFileSync(htmlPath, $.html(), 'utf8');
    console.log('Successfully completely rebuilt manufacturing content layout for full width.');
} else {
    console.error('Target container elementor-element-6e38495 not found');
}

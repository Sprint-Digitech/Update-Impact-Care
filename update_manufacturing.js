const fs = require('fs');
const cheerio = require('cheerio');

const htmlPath = 'src/content/bodies/manufacturing.html';
const html = fs.readFileSync(htmlPath, 'utf8');
const $ = cheerio.load(html, { decodeEntities: false });

const newContent = `
<div class="elementor-element e-flex e-con-boxed e-con e-parent new-manufacturing-layout" style="padding: 80px 0;">
    <div class="e-con-inner" style="display: flex; flex-wrap: wrap; align-items: center; gap: 40px; margin-bottom: 80px;">
        <div class="e-con-child" style="flex: 1; min-width: 300px;">
            <img src="/assets/uploads/images/quality_assurance.png" alt="Quality Assurance" style="width: 100%; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
        </div>
        <div class="e-con-child" style="flex: 1; min-width: 300px; padding: 20px;">
            <h2 style="font-size: 42px; font-weight: 700; color: #222; margin-bottom: 20px; font-family: 'Inter', sans-serif;">Quality Assurance</h2>
            <p style="font-size: 16px; color: #555; line-height: 1.8; font-family: 'Inter', sans-serif;">
                Impact Health Care - Medicine manufacturing Company.<br><br>
                We believe that continuously attaining high levels of quality in all we do is essential for strengthening the foundation of a responsible brand.<br><br>
                Each stage of our operations, including purchasing, production, transportation, and safe product disposal, is infused with quality. The previous few years have been devoted to improving our QMS to successfully meet and surpass the demands of many regulatory agencies, including the US FDA, MHRA, TGA, MCC, and WHO.<br><br>
                To guarantee quality, the Quality Control (QC) team develops and puts into effect strict procedures during the manufacturing process. Post-manufacturing, strict pharmacovigilance and destruction of faulty and expired items enhance the quality of products.
            </p>
        </div>
    </div>

    <div class="e-con-inner" style="display: flex; flex-wrap: wrap; align-items: center; gap: 40px; flex-direction: row-reverse; margin-bottom: 80px;">
        <div class="e-con-child" style="flex: 1; min-width: 300px;">
            <img src="/assets/uploads/images/qa_lab.png" alt="QA Lab Illustration" style="width: 100%;">
        </div>
        <div class="e-con-child" style="flex: 1; min-width: 300px; padding: 20px;">
            <h2 style="font-size: 36px; font-weight: 700; color: #222; margin-bottom: 30px; line-height: 1.3; font-family: 'Inter', sans-serif;">Tests Conducted By The Impact Quality Control Team</h2>
            <ul style="list-style: none; padding: 0; font-size: 18px; color: #444; line-height: 2.5; font-family: 'Inter', sans-serif;">
                <li style="margin-bottom: 15px; display: flex; align-items: center;"><i class="fas fa-share" style="color: #333; margin-right: 15px; font-size: 18px;"></i> Purity</li>
                <li style="margin-bottom: 15px; display: flex; align-items: center;"><i class="fas fa-share" style="color: #333; margin-right: 15px; font-size: 18px;"></i> Effective Products</li>
                <li style="margin-bottom: 15px; display: flex; align-items: center;"><i class="fas fa-share" style="color: #333; margin-right: 15px; font-size: 18px;"></i> Toxicity</li>
                <li style="margin-bottom: 15px; display: flex; align-items: center;"><i class="fas fa-share" style="color: #333; margin-right: 15px; font-size: 18px;"></i> Composition</li>
            </ul>
        </div>
    </div>
</div>

<div class="elementor-element e-flex e-con-boxed e-con e-parent new-manufacturing-layout" style="padding: 80px 0; background: linear-gradient(135deg, #1aa492, #0e8374); color: white;">
    <div class="e-con-inner" style="display: flex; flex-wrap: wrap; align-items: center; gap: 40px;">
        <div class="e-con-child" style="flex: 1; min-width: 300px; padding: 20px;">
            <h2 style="font-size: 42px; font-weight: 700; margin-bottom: 25px; color: white; font-family: 'Inter', sans-serif;">Maintaining Quality</h2>
            <p style="font-size: 16px; line-height: 1.8; margin-bottom: 20px; color: rgba(255,255,255,0.9); font-family: 'Inter', sans-serif;">
                We believe that making sufficient and prompt investments to improve our quality management procedures will pay off in the long run by reducing the cost of failure and supporting legal compliance.
            </p>
            <p style="font-size: 16px; line-height: 1.8; margin-bottom: 20px; color: rgba(255,255,255,0.9); font-family: 'Inter', sans-serif;">
                The cutting-edge production facilities adhere to both national and international standards and are cGMP compliant. The Impact Quality Control Laboratories have finished the first phase of the Laboratory Information Management System (LIMS), which greatly enhances data management.
            </p>
            <p style="font-size: 16px; line-height: 1.8; color: rgba(255,255,255,0.9); font-family: 'Inter', sans-serif;">
                Our facilities maintain quality by using industry best practices, adopting the latest technologies, and renewing their equipment regularly. We built an effective framework to produce goods that meet demanding requirements and in-process inspections, which leads to superior product quality.
            </p>
        </div>
        <div class="e-con-child" style="flex: 1; min-width: 300px;">
            <img src="/assets/uploads/images/qa_clipboard.png" alt="QA Clipboard" style="width: 100%; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.2)); border-radius: 12px;">
        </div>
    </div>
</div>

<div class="elementor-element e-flex e-con-boxed e-con e-parent new-manufacturing-layout" style="padding: 80px 0;">
    <div class="e-con-inner" style="display: flex; flex-wrap: wrap; align-items: stretch; gap: 40px;">
        <!-- R&D -->
        <div class="e-con-child" style="flex: 1; min-width: 300px; display: flex; flex-direction: column; box-shadow: 0 4px 20px rgba(0,0,0,0.05); padding: 40px; border-radius: 12px; background: white; border: 1px solid #f0f0f0;">
            <img src="/assets/uploads/images/rd_satisfaction.png" alt="R&D" style="width: 100%; height: 280px; object-fit: cover; object-position: left; border-radius: 8px; margin-bottom: 30px;">
            <h2 style="font-size: 36px; font-weight: 700; color: #222; margin-bottom: 20px; font-family: 'Inter', sans-serif;">R&D</h2>
            <p style="font-size: 16px; color: #555; line-height: 1.8; font-family: 'Inter', sans-serif;">
                Our research is incredibly fast, transparent and focused on succeeding in a competitive atmosphere when it comes to providing care for people. An external community network of over 200+ academic and 100 industry alliances centres around the area of shared scientific interest. The R&D works in a drug-safe environment to provide medicines for diseases across the world from the common cold to the rarest and most contagious disease.
            </p>
        </div>
        <!-- Client Satisfaction -->
        <div class="e-con-child" style="flex: 1; min-width: 300px; display: flex; flex-direction: column; box-shadow: 0 4px 20px rgba(0,0,0,0.05); padding: 40px; border-radius: 12px; background: white; border: 1px solid #f0f0f0;">
            <img src="/assets/uploads/images/rd_satisfaction.png" alt="Client Satisfaction" style="width: 100%; height: 280px; object-fit: cover; object-position: right; border-radius: 8px; margin-bottom: 30px;">
            <h2 style="font-size: 36px; font-weight: 700; color: #222; margin-bottom: 20px; font-family: 'Inter', sans-serif;">Client Satisfaction</h2>
            <p style="font-size: 16px; color: #555; line-height: 1.8; font-family: 'Inter', sans-serif;">
                Definitely to care and cure is not a business for us. Our client's satisfaction and the potential we find to support and save the lives of patients is more valued in Impact Health care than profit and digits. We strongly pride ourselves in bringing a systematic, safe and Impactful medicational service to the clients. The Quality Control Department is independent and is under the authority of competent team with years of experience and qualification.
            </p>
        </div>
    </div>
</div>
`;

// Find the target container and replace it
const target = $('.elementor-element-6e38495');
if (target.length > 0) {
    target.replaceWith(newContent);
    fs.writeFileSync(htmlPath, $.html(), 'utf8');
    console.log('Successfully replaced manufacturing content');
} else {
    console.error('Target container elementor-element-6e38495 not found');
}

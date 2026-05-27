const fs = require('fs');
const cheerio = require('cheerio');

const indexHtml = fs.readFileSync('src/content/bodies/index.html', 'utf8');
let mfgHtml = fs.readFileSync('src/content/bodies/manufacturing.html', 'utf8');

const $index = cheerio.load(indexHtml, { decodeEntities: false });
const $mfg = cheerio.load(mfgHtml, { decodeEntities: false });

$mfg('.ekit-template-content-header').replaceWith( $index.html($index('.ekit-template-content-header')) );

const qaPara = $mfg('h3:contains("Quality Assurance")').closest('.elementor-widget-heading').nextAll('.elementor-widget-text-editor').first();
qaPara.find('.elementor-widget-container').html(`
    <p style="text-align: justify;"><strong>Impact Health Care - Medicine manufacturing Company.</strong><br><br>We believe that continuously attaining high levels of quality in all we do is essential for strengthening the foundation of a responsible brand. Each stage of our operations, including purchasing, production, transportation, and safe product disposal, is infused with quality.<br><br>The previous few years have been devoted to improving our QMS to successfully meet and surpass the demands of many regulatory agencies, including the US FDA, MHRA, TGA, MCC, and WHO. To guarantee quality, the Quality Control (QC) team develops and puts into effect strict procedures during the manufacturing process. Post-manufacturing, strict pharmacovigilance and destruction of faulty and expired items enhance the quality of products.</p>
`);

qaPara.after(`
<div class="elementor-element at-heading-animation at-animation-heading-none elementor-widget elementor-widget-heading" style="margin-top: 40px; margin-bottom: 15px;">
    <div class="elementor-widget-container">
        <h3 class="elementor-heading-title elementor-size-default">Maintaining Quality</h3>
    </div>
</div>
<div class="elementor-element elementor-widget elementor-widget-text-editor">
    <div class="elementor-widget-container">
        <p style="text-align: justify;">We believe that making sufficient and prompt investments to improve our quality management procedures will pay off in the long run by reducing the cost of failure and supporting legal compliance.<br><br>The cutting-edge production facilities adhere to both national and international standards and are cGMP compliant. The Impact Quality Control Laboratories have finished the first phase of the Laboratory Information Management System (LIMS), which greatly enhances data management.<br><br>Our facilities maintain quality by using industry best practices, adopting the latest technologies, and renewing their equipment regularly. We built an effective framework to produce goods that meet demanding requirements and in-process inspections, which leads to superior product quality.</p>
    </div>
</div>

<div class="elementor-element at-heading-animation at-animation-heading-none elementor-widget elementor-widget-heading" style="margin-top: 40px; margin-bottom: 15px;">
    <div class="elementor-widget-container">
        <h3 class="elementor-heading-title elementor-size-default">Tests Conducted By The Impact Quality Control Team</h3>
    </div>
</div>
<div class="elementor-element elementor-widget elementor-widget-text-editor" style="margin-bottom: 40px;">
    <div class="elementor-widget-container">
        <ul style="list-style-type: none; padding-left: 0; font-size: 16px; color: #555; line-height: 2;">
            <li style="margin-bottom: 10px;"><i class="fas fa-check-circle" style="color: #00a99d; margin-right: 10px;"></i> Purity</li>
            <li style="margin-bottom: 10px;"><i class="fas fa-check-circle" style="color: #00a99d; margin-right: 10px;"></i> Effective Products</li>
            <li style="margin-bottom: 10px;"><i class="fas fa-check-circle" style="color: #00a99d; margin-right: 10px;"></i> Toxicity</li>
            <li style="margin-bottom: 10px;"><i class="fas fa-check-circle" style="color: #00a99d; margin-right: 10px;"></i> Composition</li>
        </ul>
    </div>
</div>
`);

const rdBox = $mfg('h3.elementskit-info-box-title:contains("R&D")').closest('.box-body');
rdBox.find('p').html(`Our research is incredibly fast, transparent and focused on succeeding in a competitive atmosphere when it comes to providing care for people. An external community network of over 200+ academic and 100 industry alliances centres around the area of shared scientific interest. The R&D works in a drug-safe environment to provide medicines for diseases across the world from the common cold to the rarest and most contagious disease.`);

const clientBox = $mfg('h3.elementskit-info-box-title:contains("Client Satisfaction")').closest('.box-body');
clientBox.find('p').html(`Definitely to care and cure is not a business for us. Our client's satisfaction and the potential we find to support and save the lives of patients is more valued in Impact Health care than profit and digits. We strongly pride ourselves in bringing a systematic, safe and Impactful medicational service to the clients. The Quality Control Department is independent and is under the authority of competent team with years of experience and qualification.`);

fs.writeFileSync('src/content/bodies/manufacturing.html', $mfg.html(), 'utf8');
console.log('Updated manufacturing.html natively!');

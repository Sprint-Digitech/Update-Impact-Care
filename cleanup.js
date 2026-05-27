const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const bodiesDir = path.join(__dirname, 'src', 'content', 'bodies');
const manifestPath = path.join(__dirname, 'src', 'content', 'pages-manifest.json');

const blogMap = {
  "achieve-optimal-health-with-expert-medical-guidance": "maintaining-regulatory-compliance-in-export-markets",
  "advanced-medical-solutions-for-every-patients-needs": "global-supply-chain-strategies-for-bulk-distribution",
  "expert-care-modern-treatments-better-health-outcomes": "innovations-in-api-formulation-and-development",
  "research-breakthrough-in-heart-disease-treatment": "new-quality-standards-in-pharmaceutical-manufacturing",
  "where-expertise-meets-exceptional-patient-care": "advancing-b2b-partnerships-in-pharma-logistics",
  "your-trusted-partner-in-comprehensive-medical-care": "streamlining-production-for-generic-medicines"
};

const titleMap = {
  "Achieve Optimal Health with Expert Medical Guidance": "Maintaining Regulatory Compliance in Export Markets",
  "Advanced Medical Solutions for Every Patient’s Needs": "Global Supply Chain Strategies for Bulk Distribution",
  "Expert Care, Modern Treatments, Better Health Outcomes": "Innovations in API Formulation and Development",
  "Research Breakthrough in Heart Disease Treatment": "New Quality Standards in Pharmaceutical Manufacturing",
  "Where Expertise Meets Exceptional Patient Care": "Advancing B2B Partnerships in Pharma Logistics",
  "Your Trusted Partner in Comprehensive Medical Care": "Streamlining Production for Generic Medicines"
};

// 1. Rename files
for (const [oldSlug, newSlug] of Object.entries(blogMap)) {
  const oldHtml = path.join(bodiesDir, `${oldSlug}.html`);
  const newHtml = path.join(bodiesDir, `${newSlug}.html`);
  if (fs.existsSync(oldHtml)) {
    fs.renameSync(oldHtml, newHtml);
  }
  const oldMeta = path.join(bodiesDir, `${oldSlug}.meta.json`);
  const newMeta = path.join(bodiesDir, `${newSlug}.meta.json`);
  if (fs.existsSync(oldMeta)) {
    let metaContent = fs.readFileSync(oldMeta, 'utf8');
    for (const [oldTitle, newTitle] of Object.entries(titleMap)) {
      metaContent = metaContent.replace(new RegExp(oldTitle, 'g'), newTitle);
    }
    fs.writeFileSync(oldMeta, metaContent);
    fs.renameSync(oldMeta, newMeta);
  }
}

// 2. Process all HTML files
const files = fs.readdirSync(bodiesDir).filter(f => f.endsWith('.html'));
for (const file of files) {
  const filePath = path.join(bodiesDir, file);
  let html = fs.readFileSync(filePath, 'utf8');
  
  // Replace blog slugs
  for (const [oldSlug, newSlug] of Object.entries(blogMap)) {
    html = html.replace(new RegExp(`/${oldSlug}/`, 'g'), `/${newSlug}/`);
  }
  
  // Replace blog titles
  for (const [oldTitle, newTitle] of Object.entries(titleMap)) {
    html = html.replace(new RegExp(oldTitle, 'g'), newTitle);
  }

  // Remove video background link and container
  html = html.replace(/"background_video_link":"[^"]*"/g, '"background_video_link":""');
  // Or just remove dispnsary-video.mp4
  html = html.replace(/https:\\\/\\\/demo.awaikenthemes.com\\\/assets\\\/videos\\\/dispnsary-video.mp4/g, '');

  const $ = cheerio.load(html, { decodeEntities: false }, false);
  let changed = false;

  // Remove the video background container element
  const videoContainers = $('.elementor-background-video-container');
  if (videoContainers.length > 0) {
    videoContainers.remove();
    changed = true;
  }

  // Remove clinical thermometer icon and subtext
  // The icon is /wp-content/uploads/2024/12/icon-health-item-2.svg
  const thermometerImg = $('img[src="/wp-content/uploads/2024/12/icon-health-item-2.svg"]');
  if (thermometerImg.length > 0) {
    const container = thermometerImg.closest('.elementor-element[data-element_type="container"]');
    if (container.length > 0) {
      container.remove();
      changed = true;
    } else {
      thermometerImg.closest('.elementor-widget').remove();
      changed = true;
    }
  }

  // Remove metal surgical forceps SVG.
  $('svg').each((i, el) => {
    const htmlSvg = $.html(el);
    // M54.1649 is the specific path segment for the forceps in the Dispensary theme
    // Let's also remove any SVG that has 'surgical' or 'scissors' or 'forceps' in its path if known, 
    // but the exact path snippet M54.1649 86.8862 is unique to that icon.
    if (htmlSvg.includes('M54.1649')) {
      const wrapper = $(el).closest('.elementor-icon-box-wrapper');
      if (wrapper.length > 0) {
        wrapper.remove();
        changed = true;
      }
    }
  });

  // Since we modified it with Cheerio, we need to save it back if changed.
  if (changed) {
    // Need to avoid appending html/head/body
    fs.writeFileSync(filePath, $.html());
  } else {
    fs.writeFileSync(filePath, html);
  }
}

// 3. Update manifest
let manifest = fs.readFileSync(manifestPath, 'utf8');
for (const [oldSlug, newSlug] of Object.entries(blogMap)) {
  manifest = manifest.replace(new RegExp(`"path": "/${oldSlug}"`, 'g'), `"path": "/${newSlug}"`);
  manifest = manifest.replace(new RegExp(`"fileKey": "${oldSlug}"`, 'g'), `"fileKey": "${newSlug}"`);
}
for (const [oldTitle, newTitle] of Object.entries(titleMap)) {
  manifest = manifest.replace(new RegExp(oldTitle, 'g'), newTitle);
}
fs.writeFileSync(manifestPath, manifest);

console.log('Cleanup completed successfully.');

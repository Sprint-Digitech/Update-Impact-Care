const fs = require('fs');
const files = [
  'src/content/bodies/home-image.html',
  'src/content/bodies/home-video.html',
  'src/content/bodies/home-slider.html'
];

let changedCount = 0;

for (const file of files) {
  if (fs.existsSync(file)) {
    let html = fs.readFileSync(file, 'utf8');

    // Replace H3
    html = html.replace(/Your Health Our Priority/g, 'WHO-GMP Certified Partner');
    // Replace H1
    html = html.replace(/Expert medical care you can rely on/g, 'From Care To Cure');
    // Replace Paragraph
    html = html.replace(/Experience healthcare you can trust\. Our dedicated team provides compassionate, high-quality care\./g, "Trusted by Patients and Medical Experts worldwide. We have strengthened our position as leaders in the Indian pharmaceutical sector, and we’ll keep our commitment to serving humanity through quality medication.  ");

    fs.writeFileSync(file, html, 'utf8');
    console.log("Updated " + file);
    changedCount++;
  }
}
console.log("Done! Changed " + changedCount + " files.");

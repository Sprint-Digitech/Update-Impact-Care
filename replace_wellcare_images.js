const fs = require('fs');
const path = require('path');

const bodiesDir = path.join(__dirname, 'src', 'content', 'bodies');
const files = fs.readdirSync(bodiesDir);

let updatedCount = 0;

for (const file of files) {
    if (file.endsWith('.html')) {
        const filePath = path.join(bodiesDir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        let modified = false;
        
        // Replace health-item-img-2.jpg with applift-syrup.jpeg
        if (content.includes('/wp-content/uploads/2024/12/health-item-img-2.jpg')) {
            content = content.replace(
                /<img([^>]*)src="\/wp-content\/uploads\/2024\/12\/health-item-img-2\.jpg"([^>]*)>/g, 
                '<img$1src="/assets/uploads/products/applift-syrup.jpeg" style="object-fit: contain; background: #ffffff; padding: 20px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); width: 100%; height: 366px;"$2>'
            );
            modified = true;
        }
        
        // Replace health-item-img-3.jpg with acumol-tablets.jpeg
        if (content.includes('/wp-content/uploads/2024/12/health-item-img-3.jpg')) {
            content = content.replace(
                /<img([^>]*)src="\/wp-content\/uploads\/2024\/12\/health-item-img-3\.jpg"([^>]*)>/g, 
                '<img$1src="/assets/uploads/products/acumol-tablets.jpeg" style="object-fit: contain; background: #ffffff; padding: 15px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); width: 100%; height: 273px;"$2>'
            );
            modified = true;
        }
        
        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated Wellcare images in ${file}`);
            updatedCount++;
        }
    }
}

console.log(`Successfully updated Wellcare section images in ${updatedCount} files.`);

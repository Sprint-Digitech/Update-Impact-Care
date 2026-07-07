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
        
        // Replace team-1.jpg with iz-500-tablets.jpeg
        if (content.includes('/wp-content/uploads/2024/12/team-1.jpg')) {
            content = content.replace(/\/wp-content\/uploads\/2024\/12\/team-1\.jpg/g, '/assets/uploads/products/iz-500-tablets.jpeg');
            modified = true;
        }
        
        // Replace team-2.jpg with fekey-syrup.jpeg
        if (content.includes('/wp-content/uploads/2024/12/team-2.jpg')) {
            content = content.replace(/\/wp-content\/uploads\/2024\/12\/team-2\.jpg/g, '/assets/uploads/products/fekey-syrup.jpeg');
            modified = true;
        }
        
        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated images in ${file}`);
            updatedCount++;
        }
    }
}

console.log(`Successfully updated images in ${updatedCount} files.`);

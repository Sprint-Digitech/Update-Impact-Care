const fs = require('fs');
const path = require('path');

const directoriesToScan = ['.', 'src/content/bodies'];
let updatedCount = 0;

function processDirectory(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isFile() && filePath.endsWith('.html') && (file.includes('index') || file.includes('home-') || file.includes('hero'))) {
            let content = fs.readFileSync(filePath, 'utf8');
            
            // Look for the specific media query block that causes the oval stretch
            const badBlock = `@media (max-width: 768px) {
    .cert-circles-container { flex-direction: column; gap: 20px; }
    .cert-circle:not(:first-child) { margin-left: 0 !important; margin-top: -20px; }
    .cert-circle { flex: 0 0 220px; height: 220px; }
}`;
            const goodBlock = `@media (max-width: 768px) {
    .cert-circles-container { flex-direction: column; gap: 20px; align-items: center; }
    .cert-circle:not(:first-child) { margin-left: 0 !important; margin-top: -20px; }
    .cert-circle { flex: 0 0 220px; width: 220px; height: 220px; margin: 0 auto; }
}`;

            if (content.includes(badBlock)) {
                content = content.replace(badBlock, goodBlock);
                fs.writeFileSync(filePath, content, 'utf8');
                console.log('Fixed cert-circle CSS in:', filePath);
                updatedCount++;
            } else if (content.includes('.cert-circles-container { flex-direction: column; gap: 20px; }')) {
                // Try a regex if exact match fails due to spaces/newlines
                const regex = /@media\s*\(max-width:\s*768px\)\s*\{\s*\.cert-circles-container\s*\{\s*flex-direction:\s*column;\s*gap:\s*20px;\s*\}\s*\.cert-circle:not\(:first-child\)\s*\{\s*margin-left:\s*0\s*!important;\s*margin-top:\s*-20px;\s*\}\s*\.cert-circle\s*\{\s*flex:\s*0\s*0\s*220px;\s*height:\s*220px;\s*\}\s*\}/g;
                if (regex.test(content)) {
                    content = content.replace(regex, goodBlock);
                    fs.writeFileSync(filePath, content, 'utf8');
                    console.log('Fixed cert-circle CSS (via regex) in:', filePath);
                    updatedCount++;
                }
            }
        }
    }
}

for (const dir of directoriesToScan) {
    processDirectory(dir);
}
console.log('Updated ' + updatedCount + ' files.');

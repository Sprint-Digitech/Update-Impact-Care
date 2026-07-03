const fs = require('fs');
const path = require('path');

const parsedFile = path.join(__dirname, 'src/data/new_parsed_products.json');
const productsJsonFile = path.join(__dirname, 'src/data/products.json');
const productsTsFile = path.join(__dirname, 'src/lib/data/products.ts');
const mediaDir = path.join(__dirname, 'docx_extract/unzipped/word/media');
const uploadsDir = path.join(__dirname, 'public/assets/uploads/products');

const newProducts = JSON.parse(fs.readFileSync(parsedFile, 'utf8'));

// Apply to products.json
const updatedProducts = newProducts.map(p => {
    // Copy image
    const sourceImageName = p.imgSource; // image1.jpeg, etc.
    const sourceImage = path.join(mediaDir, sourceImageName);
    const targetImageName = `${p.slug}.jpeg`;
    const targetImage = path.join(uploadsDir, targetImageName);
    
    if (fs.existsSync(sourceImage)) {
        fs.copyFileSync(sourceImage, targetImage);
    }
    
    return {
        ...p,
        imgSource: targetImageName
    };
});

fs.writeFileSync(productsJsonFile, JSON.stringify(updatedProducts, null, 2));

// Update products.ts
const tsContent = `export const products = ${JSON.stringify(updatedProducts, null, 2)};
`;
fs.writeFileSync(productsTsFile, tsContent);

console.log(`Applied all ${updatedProducts.length} products successfully!`);

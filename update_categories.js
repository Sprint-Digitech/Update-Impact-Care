const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, 'src/data/products.json');
const tsPath = path.join(__dirname, 'src/lib/data/products.ts');

let products = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

products = products.map(p => {
    const lowerTitle = p.title.toLowerCase();
    const lowerForm = (p.dosageForm || '').toLowerCase();
    let category = "Tablets"; // default
    
    if (lowerTitle.includes('syrup') || lowerTitle.includes('suspension') || lowerForm.includes('syrup') || lowerForm.includes('suspension')) {
        category = "Syrups & Suspensions";
    } else if (lowerTitle.includes('injection') || lowerForm.includes('injection')) {
        category = "Injections";
    } else if (lowerTitle.includes('capsule') || lowerForm.includes('capsule')) {
        category = "Capsules";
    } else if (lowerTitle.includes('cream') || lowerTitle.includes('ointment') || lowerForm.includes('cream')) {
        category = "Creams & Ointments";
    } else if (lowerTitle.includes('drop') || lowerForm.includes('drop')) {
        category = "Drops";
    } else if (lowerTitle.includes('kit') || lowerForm.includes('kit')) {
        category = "Kits";
    } else {
        category = "Tablets";
    }
    
    return {
        ...p,
        category: category
    };
});

fs.writeFileSync(jsonPath, JSON.stringify(products, null, 2));

const tsContent = `export type Product = {
  id: number;
  title: string;
  slug: string;
  category: string;
  dosageForm: string;
  composition: string;
  packDetail: string;
  description: string;
  imgSource: string;
};

export const products: Product[] = ${JSON.stringify(products, null, 2)};
`;

fs.writeFileSync(tsPath, tsContent);
console.log("Categories updated successfully!");

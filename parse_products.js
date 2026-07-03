const fs = require('fs');

const text = fs.readFileSync('d:/New-Impact-Care/docx_extract/extracted_text.txt', 'utf8');

// The text format looks like:
// Brand Name Composition Pack
// R-LUME Suspension Each 5ml of R-Lume Susp contains :- Artemether 180mg + Lum efantrine 1080mg 60ml Desciption :- R-LUME Suspension is... 2) IZ – 500mg Tablets :-

// Let's split by number pattern like "1)", "2)", etc. or by "Brand Name"
const parts = text.split(/Brand Name\s*Composition\s*Pack/i);
// parts[0] is everything before the first table
// parts[1] is the first product, parts[2] is second, etc.

let products = [];
for (let i = 1; i < parts.length; i++) {
    let part = parts[i].trim();
    // In each part, we need to extract Brand Name, Composition, Pack, Description
    // The format is a bit mashed together because of the table extraction.
    // Let's try to match it based on known structures.
    // Generally, the next product number (e.g. "2)", "3)") indicates the end of the current product.
    
    // We can just dump the raw text for each part and manually fix it or use regex to clean it.
    // Actually, let's just save the parsed parts to see what they look like.
    products.push({ id: i, raw: part });
}

fs.writeFileSync('d:/New-Impact-Care/docx_extract/parsed_raw.json', JSON.stringify(products, null, 2));
console.log('Parsed ' + products.length + ' products.');

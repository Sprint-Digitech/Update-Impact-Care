const fs = require('fs');

const rawText = fs.readFileSync('d:/New-Impact-Care/docx_extract/clean_text.txt', 'utf8');

// The text has numbered headers like "1) R-LUME SUSPENSION :-"
// We can split by the pattern "digit) " or "\n digit) "
const splitRegex = /\n\s*\d+\)\s*(.+?)\s*:-/g;
let parts = [];
let match;
let lastIndex = 0;
let lastTitle = "";

while ((match = splitRegex.exec(rawText)) !== null) {
    if (lastTitle !== "") {
        parts.push({
            titleHeader: lastTitle,
            content: rawText.substring(lastIndex, match.index)
        });
    }
    lastTitle = match[1].trim();
    lastIndex = splitRegex.lastIndex;
}

if (lastTitle !== "") {
    parts.push({
        titleHeader: lastTitle,
        content: rawText.substring(lastIndex)
    });
} else {
    // If it started with "1) " without newline
    const firstMatch = /^\s*\d+\)\s*(.+?)\s*:-/.exec(rawText);
    if(firstMatch) {
       // Need a different parsing approach. 
       // Let's just do a simpler split
       let rawParts = rawText.split(/\d+\)\s*/);
       rawParts.shift(); // remove empty first element
       parts = rawParts.map(p => {
           let lines = p.trim().split('\n');
           let header = lines[0].replace(':-', '').trim();
           return {
               titleHeader: header,
               content: p
           }
       })
    }
}

if (parts.length === 0) {
    // fallback split
    let rawParts = rawText.split(/\n\s*\d+\)\s*/);
    if (rawParts.length > 1) {
        if (!/^\d+\)/.test(rawText)) {
            rawParts.shift();
        }
        parts = rawParts.map(p => {
            let lines = p.trim().split('\n');
            let header = lines[0].replace(':-', '').trim();
            return { titleHeader: header, content: p };
        });
    }
}

// First one might have been missed if it started exactly at the beginning.
if (!rawText.startsWith('\n') && /^\d+\)/.test(rawText) && parts.length === 0) {
    let rawParts = rawText.split(/\d+\)\s*/);
    rawParts.shift();
    parts = rawParts.map(p => {
        let lines = p.trim().split('\n');
        let header = lines[0].replace(':-', '').trim();
        return { titleHeader: header, content: p };
    });
} else if (parts.length === 0) {
     // Hardcode split by "Pack\n\n" maybe?
     // Let's use the split by "\n\d+)" and see.
     let chunks = rawText.split(/(?:^|\n)\s*\d+\)\s*/);
     chunks.shift();
     parts = chunks.map(p => {
         let lines = p.trim().split('\n');
         let header = lines[0].replace(':-', '').trim();
         return { titleHeader: header, content: p };
     });
}

function cleanString(str) {
    if(!str) return "";
    return str.replace(/\r/g, '').replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
}

function generateSlug(name) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const finalProducts = [];
let imgCounter = 1;

parts.forEach((part, index) => {
    // Find Brand Name, Composition, Pack, Description
    // Look for "Brand Name\n\nComposition\n\nPack\n\n"
    
    // We can just extract lines
    const lines = part.content.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    
    // Usually, lines look like:
    // 0: R-LUME SUSPENSION :-  (or similar)
    // 1: Brand Name
    // 2: Composition
    // 3: Pack
    // 4: R-LUME Suspension (Brand Name value)
    // 5: Each 5ml ... (Composition value)
    // ...
    
    let brandIndex = lines.findIndex(l => l === "Brand Name");
    let compIndex = lines.findIndex(l => l === "Composition");
    let packIndex = lines.findIndex(l => l === "Pack");
    
    if (brandIndex !== -1 && packIndex !== -1) {
        let name = lines[packIndex + 1] || part.titleHeader;
        let comp = lines[packIndex + 2] || "";
        // sometimes composition is multiple lines, so we collect until we hit pack value
        // Pack value is usually short, e.g., "60ml", "1 X 3 Tablets"
        
        // Let's find the description. It's usually the longest text at the end.
        let desc = "";
        let packValue = "";
        let packValueIndex = -1;
        
        for (let i = packIndex + 2; i < lines.length; i++) {
            if (/^\d+\s*(ml|X|Vial|Ampoule)/i.test(lines[i]) || lines[i] === "Jelly" || /Tablets|Capsules|Cream/.test(lines[i])) {
                if(lines[i].length < 40) {
                    packValue = lines[i];
                    packValueIndex = i;
                    break;
                }
            }
        }
        
        if (packValueIndex !== -1) {
            comp = lines.slice(packIndex + 2, packValueIndex).join(" ");
            desc = lines.slice(packValueIndex + 1).join(" ");
        } else {
            // fallback
            desc = lines[lines.length - 1];
        }

        if (desc.startsWith("Desciption :-") || desc.startsWith("Description :-")) {
            desc = desc.replace(/Desc.*?:-/i, "").trim();
        }

        // Determine Dosage Form
        let df = "Tablet";
        let lowerName = name.toLowerCase();
        if (lowerName.includes("syrup") || lowerName.includes("suspension") || lowerName.includes("drops") || lowerName.includes("oral solution")) df = "Syrup/Suspension";
        if (lowerName.includes("injection") || lowerName.includes("vial") || lowerName.includes("ampoule")) df = "Injection";
        if (lowerName.includes("capsule")) df = "Capsule";
        if (lowerName.includes("cream") || lowerName.includes("jelly")) df = "Cream/Jelly";
        
        // Determine Category (placeholder based on keywords)
        let cat = "General";
        let lowerDesc = desc.toLowerCase();
        if (lowerDesc.includes("antibiotic") || lowerDesc.includes("bacterial")) cat = "Antibiotic";
        if (lowerDesc.includes("pain") || lowerDesc.includes("inflammation") || lowerDesc.includes("nsaid")) cat = "NSAID";
        if (lowerDesc.includes("malaria")) cat = "Antimalarial";
        if (lowerDesc.includes("hypertension") || lowerDesc.includes("blood pressure")) cat = "Cardiovascular";
        if (lowerDesc.includes("acid") || lowerDesc.includes("ulcer") || lowerDesc.includes("ppi") || lowerDesc.includes("gastro")) cat = "Gastrointestinal";
        if (lowerDesc.includes("iron") || lowerDesc.includes("nutritional") || lowerDesc.includes("appetite")) cat = "Supplement";
        
        finalProducts.push({
            id: index + 1,
            title: cleanString(name),
            slug: generateSlug(cleanString(name)),
            category: cat,
            dosageForm: df,
            composition: cleanString(comp),
            packDetail: cleanString(packValue),
            description: cleanString(desc),
            imgSource: `image${imgCounter}.jpeg` // Mapping to extracted image
        });
        
        // Some products have two variations in one block (e.g. Sidegra 50 and 100)
        // If it's a dual product, the document might have another "1 X 4 Tablets" and description.
        // We will increment the image counter anyway since there are 37 products and 37 images.
        // Wait, the doc has 37 images, so let's assume 1-to-1 mapping.
        imgCounter++;
        
    }
});

fs.writeFileSync('d:/New-Impact-Care/src/data/new_parsed_products.json', JSON.stringify(finalProducts, null, 2));
console.log("Parsed " + finalProducts.length + " products out of 37.");

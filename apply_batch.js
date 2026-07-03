
const fs = require('fs');
const path = require('path');

const firstBatch = JSON.parse(fs.readFileSync('src/data/products.json', 'utf8'));

let content = fs.readFileSync('src/content/bodies/products.html', 'utf8');

// The original file has a grid element `<div class="elementor-element elementor-element-7e00e1b` 
// Inside it, it lists the products. We want to completely replace the inside of this grid.
const gridStartStr = '<div class="elementor-element elementor-element-7e00e1b';
const gridIdx = content.indexOf(gridStartStr);
const gridInnerIdx = content.indexOf('>', gridIdx) + 1; // start of grid children

// Find the end of the grid children. 
// It is followed by `<div class="elementor-element elementor-element-c4db441`
const gridEndStr = '<div class="elementor-element elementor-element-c4db441';
let gridEndIdx = content.indexOf(gridEndStr);
// The grid container actually ends a few `</div>`s before this.
// Let's just find the exact closing tags.
let endOfInner = content.lastIndexOf('</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>', gridEndIdx);
if (endOfInner === -1) endOfInner = gridEndIdx - 50; // rough fallback

// Extract a template from the original file BEFORE we wipe it out
const acofanStart = content.indexOf('<div class="elementor-element elementor-element-98f5a55 e-con-full service-item');
const match = /<div class="elementor-element elementor-element-[a-z0-9]+ e-con-full service-item/g;
match.exec(content); 
const acumolMatch = match.exec(content);
let templateHtml = "";
if (acumolMatch && acofanStart !== -1) {
    const acumolStart = acumolMatch.index;
    templateHtml = content.substring(acofanStart, acumolStart);
    fs.writeFileSync('item_template.html', templateHtml); // Save it for future batches
} else {
    // If it's already modified, load from saved template
    templateHtml = fs.readFileSync('item_template.html', 'utf8');
}

let generatedHtml = '';
firstBatch.forEach((p, index) => {
    const newId1 = 'gen' + p.id + 'a';
    const newId2 = 'gen' + p.id + 'b';
    const newId3 = 'gen' + p.id + 'c';
    const newId4 = 'gen' + p.id + 'd';
    const imgUrl = p.image;
    const catData = p.category.replace(/, /g, ' ').toLowerCase();

    // Replace original acofan data with new data
    let itemHtml = templateHtml
        .replace(/98f5a55/g, newId1)
        .replace(/5fd3057/g, newId2)
        .replace(/>Acofan 100mg\/500mg Tablet</, ">" + p.name + "<")
        .replace(/acofan-tablet/g, p.slug)
        .replace(/ef9b0e5/g, newId3)
        .replace(/>Aceclofenac 100mg \+ Paracetamol 500mg \| Tablet</, ">" + p.composition + " | " + p.dosageForm + "<")
        .replace(/c81802f/g, newId4)
        .replace(/\/assets\/uploads\/products\/acofan_tablet_1779861526962\.png/g, imgUrl)
        .replace(/class="elementor-element elementor-element-[a-z0-9]+ e-con-full service-item e-flex  e-con e-child"/, 
                 `class="elementor-element elementor-element-${newId1} e-con-full service-item e-flex  e-con e-child" data-category="${catData}"`);
    
    generatedHtml += itemHtml;
});

// GENERATE TABS HTML
const uniqueCats = ["All", ...new Set(firstBatch.map(p => p.category))];

let tabsHtml = `<div class="category-tabs-container" style="text-align: center; margin-bottom: 40px; padding: 0 20px;">
    <div class="category-tabs" style="display: inline-flex; flex-wrap: wrap; justify-content: center; gap: 10px; background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(10px); padding: 15px 25px; border-radius: 50px; box-shadow: 0 8px 32px rgba(0,0,0,0.05); border: 1px solid rgba(0,0,0,0.05);">
`;

uniqueCats.forEach(c => {
    let active = c === "All" ? "active-tab" : "";
    let dataCat = c === "All" ? "all" : c.toLowerCase();
    tabsHtml += `        <button class="cat-tab ${active}" data-filter="${dataCat}" style="background: transparent; border: none; padding: 10px 20px; font-weight: 600; font-family: 'Inter', sans-serif; color: #0B1030; cursor: pointer; border-radius: 30px; transition: all 0.3s ease;">${c}</button>\n`;
});

tabsHtml += `    </div>
</div>
<script>
    document.addEventListener('DOMContentLoaded', function() {
        const tabs = document.querySelectorAll('.cat-tab');
        const items = document.querySelectorAll('.service-item');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => {
                    t.style.background = 'transparent';
                    t.style.color = '#0B1030';
                    t.classList.remove('active-tab');
                });
                
                tab.style.background = 'linear-gradient(135deg, #00505A, #001937)';
                tab.style.color = '#ffffff';
                tab.classList.add('active-tab');
                
                const filter = tab.getAttribute('data-filter');
                
                items.forEach(item => {
                    if (filter === 'all') {
                        item.style.display = 'flex';
                    } else {
                        const itemCat = item.getAttribute('data-category');
                        if (itemCat && itemCat.includes(filter)) {
                            item.style.display = 'flex';
                        } else {
                            item.style.display = 'none';
                        }
                    }
                });
            });
        });
        
        // Initial active styling
        const activeTab = document.querySelector('.cat-tab.active-tab');
        if (activeTab) {
            activeTab.style.background = 'linear-gradient(135deg, #00505A, #001937)';
            activeTab.style.color = '#ffffff';
        }
    });
</script>
`;

// Since the original file might already have our generated Tabs and old products, 
// let's completely replace the grid inner HTML.
let prefix = content.substring(0, gridInnerIdx);
let suffix = content.substring(endOfInner);

// Remove old tabs if they exist in prefix
if (prefix.includes('<div class="category-tabs-container"')) {
    const tabsStart = prefix.indexOf('<div class="category-tabs-container"');
    const tabsEnd = prefix.indexOf('</script>', tabsStart) + 9;
    prefix = prefix.substring(0, tabsStart) + prefix.substring(tabsEnd);
}

const finalContent = prefix + tabsHtml + generatedHtml + "\n\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>" + suffix.substring(suffix.indexOf('<div class="elementor-element elementor-element-c4db441'));

fs.writeFileSync('src/content/bodies/products.html', finalContent, 'utf8');
console.log('Rebuilt products.html successfully with new batch!');

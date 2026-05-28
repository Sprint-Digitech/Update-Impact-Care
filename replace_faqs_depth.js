const fs = require('fs');
const path = require('path');

const faqsData = [
  {
    title: "What's Impact's mission and vision?",
    content: "The Impact Healthcare mission and vision is named the Purpose of Impact, which is to Care and to Cure."
  },
  {
    title: "What fundamental values does Impact uphold?",
    content: "The four guiding principles of Impact culture are satisfaction, ownership, quality, and courage."
  },
  {
    title: "What is Impact recognized for?",
    content: "Some of the most effective medications and vaccines in the world have been created by Impact, including the internationally recognised pain reliever, a popular drug for the treatment of panic and anxiety conditions a treatment for erectile dysfunction (ED), a vaccine to help prevent COVID-19."
  },
  {
    title: "When did Impact Begin?",
    content: "Impact was incorporated in 2004."
  }
];

const bodiesDir = path.join(__dirname, 'src/content/bodies');
const files = fs.readdirSync(bodiesDir).filter(f => f.endsWith('.html'));

files.forEach(f => {
  let filepath = path.join(bodiesDir, f);
  let content = fs.readFileSync(filepath, 'utf8');
  let hasChanges = false;
  
  let startIndex = 0;
  
  while (true) {
    let matchIdx = content.indexOf('<div class="elementskit-accordion', startIndex);
    if (matchIdx === -1) break;
    
    // Find the end of the accordion div
    let depth = 0;
    let endIdx = -1;
    for (let i = matchIdx; i < content.length; i++) {
        if (content.substr(i, 4) === '<div') {
            depth++;
        } else if (content.substr(i, 5) === '</div') {
            depth--;
            if (depth === 0) {
                endIdx = i + 6; // Include closing tag '</div>'
                break;
            }
        }
    }
    
    if (endIdx !== -1) {
      // We found the full accordion HTML. Let's replace its content.
      let fullAccordionStr = content.substring(matchIdx, endIdx);
      
      // Extract accordion ID
      let idMatch = fullAccordionStr.match(/id="([^"]+)"/);
      let accordionId = idMatch ? idMatch[1] : 'accordion-' + Math.random().toString(36).substr(2, 9);
      
      let newAccordionHTML = `<div class="elementskit-accordion accoedion-primary" id="${accordionId}">\n`;
      
      faqsData.forEach((faq, index) => {
        let collapseId = `collapse-${Math.random().toString(36).substr(2, 9)}`;
        let headingId = `primaryHeading-${index}-${Math.random().toString(36).substr(2, 6)}`;
        let isActive = index === 0;
        
        newAccordionHTML += `
\t\t\t\t\t\t\t\t\t\t\t<div class="elementskit-card ${isActive ? 'active' : ''}">
\t\t\t\t\t\t\t\t\t\t\t\t<div class="elementskit-card-header" id="${headingId}">
\t\t\t\t\t\t\t\t\t\t\t\t\t<a href="#${collapseId}"
\t\t\t\t\t\t\t\t\t\t\t\t\t\tclass="ekit-accordion--toggler elementskit-btn-link ${isActive ? '' : 'collapsed'}"
\t\t\t\t\t\t\t\t\t\t\t\t\t\tdata-ekit-toggle="collapse"
\t\t\t\t\t\t\t\t\t\t\t\t\t\tdata-target="#${collapseId}"
\t\t\t\t\t\t\t\t\t\t\t\t\t\taria-expanded="${isActive ? 'true' : 'false'}"
\t\t\t\t\t\t\t\t\t\t\t\t\t\taria-controls="${collapseId}">

\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class="ekit-accordion-title">${faq.title}</span>

\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="ekit_accordion_icon_group">
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="ekit_accordion_normal_icon">
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- Normal Icon -->
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<i class="fas fa-chevron-up"></i>
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>

\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="ekit_accordion_active_icon">
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- Active Icon -->
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<i class="fas fa-chevron-down"></i>
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t\t\t\t\t\t</a>
\t\t\t\t\t\t\t\t\t\t\t\t</div>

\t\t\t\t\t\t\t\t\t\t\t\t<div id="${collapseId}" class=" ${isActive ? 'show ' : ''}collapse"
\t\t\t\t\t\t\t\t\t\t\t\t\taria-labelledby="${headingId}"
\t\t\t\t\t\t\t\t\t\t\t\t\tdata-parent="#${accordionId}">

\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="elementskit-card-body ekit-accordion--content">
\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="accordion-item wow fadeInUp">
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="accordion-collapse collapse show">
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="accordion-body">
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p>${faq.content}</p>
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t\t\t\t\t\t</div>

\t\t\t\t\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t\t\t\t</div><!-- .elementskit-card END -->
`;
      });
      newAccordionHTML += `\t\t\t\t\t\t\t\t\t\t</div>`;
      
      content = content.substring(0, matchIdx) + newAccordionHTML + content.substring(endIdx);
      hasChanges = true;
      startIndex = matchIdx + newAccordionHTML.length;
    } else {
      startIndex = matchIdx + 10;
    }
  }
  
  if (hasChanges) {
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`Updated FAQs in ${f}`);
  }
});

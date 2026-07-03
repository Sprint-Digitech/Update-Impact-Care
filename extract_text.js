const fs = require('fs');

const xml = fs.readFileSync('d:/New-Impact-Care/docx_extract/word/document.xml', 'utf8');

// Regex to extract text from <w:t> tags
const regex = /<w:t[^>]*>(.*?)<\/w:t>/g;
let match;
let text = '';
while ((match = regex.exec(xml)) !== null) {
  text += match[1] + ' ';
}

// Basic cleanup of XML entities if any
text = text.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');

fs.writeFileSync('d:/New-Impact-Care/docx_extract/extracted_text.txt', text);
console.log('Text extracted to extracted_text.txt');

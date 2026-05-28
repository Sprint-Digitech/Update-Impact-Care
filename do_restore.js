const fs = require('fs');
const filePath = 'src/styles/globals.css';
let content = fs.readFileSync(filePath, 'utf8');

const startIndex = content.indexOf('.top-hero-banner {');
const endIndexStr = '.top-hero-banner .ekit-breadcrumb {\n  justify-content: center !important;\n}';
const endIndex = content.indexOf(endIndexStr);

if (startIndex !== -1 && endIndex !== -1) {
    const toReplace = content.substring(startIndex, endIndex + endIndexStr.length);
    
    const originalStyle = `.top-hero-banner {
  position: relative !important;
  left: 50% !important;
  right: 50% !important;
  width: 100vw !important;
  max-width: 100vw !important;
  margin-left: -50vw !important;
  margin-right: -50vw !important;
  border-radius: 40px 40px 0 0 !important;
  min-height: clamp(350px, 45vh, 600px) !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  box-sizing: border-box !important;
  padding: 120px 20px 80px !important;
  overflow: hidden !important;
  margin-top: 15px !important;
}
.top-hero-banner > .e-con-inner {
  max-width: 1140px !important;
  margin: 0 auto !important;
  width: 100% !important;
  position: relative !important;
  z-index: 2 !important;
}
.top-hero-banner::before {
  content: '' !important;
  position: absolute !important;
  inset: 0 !important;
  background: linear-gradient(
      180deg,
      rgba(0, 10, 25, 0.4) 0%,
      rgba(0, 15, 35, 0.6) 50%,
      rgba(0, 20, 40, 0.85) 100%
  ) !important;
  z-index: 0 !important;
}
.top-hero-banner h1,
.top-hero-banner h2,
.top-hero-banner h3,
.top-hero-banner p,
.top-hero-banner .ekit-breadcrumb {
  text-shadow: 0 4px 16px rgba(0, 0, 0, 0.9) !important;
  color: #ffffff !important;
}`;

    content = content.replace(toReplace, originalStyle);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Restored perfectly.');
} else {
    console.log('Could not find indices. startIndex: ' + startIndex + ', endIndex: ' + endIndex);
}

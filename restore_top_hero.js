const fs = require('fs');
const filePath = 'src/styles/globals.css';
let content = fs.readFileSync(filePath, 'utf8');

// We need to replace the big block of .top-hero-banner that was just added.
const regex = /\.top-hero-banner\s*\{[\s\S]*?\.top-hero-banner\s*\.ekit-breadcrumb\s*\{\s*justify-content:\s*center\s*!important;\s*\}/;

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
  margin-top: 15px !important; /* To show the curved corners correctly under the floating header */
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

if (content.match(regex)) {
    content = content.replace(regex, originalStyle);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Restored top-hero-banner correctly.');
} else {
    console.log('Regex did not match.');
}

const fs = require('fs');

const cssPath = 'src/styles/globals.css';
let css = fs.readFileSync(cssPath, 'utf8');

const newCss = `

/* Manufacturing Page Layout Grids */
.mfg-grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    align-items: center;
    margin-bottom: 60px;
}
.mfg-grid-container.reverse {
    direction: rtl;
}
.mfg-grid-container.reverse > * {
    direction: ltr;
}
.mfg-image-wrapper img {
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
    width: 100%;
    height: auto;
    object-fit: cover;
}
@media (max-width: 768px) {
    .mfg-grid-container {
        grid-template-columns: 1fr;
        gap: 20px;
    }
    .mfg-grid-container.reverse {
        direction: ltr;
    }
}
`;

if (!css.includes('.mfg-grid-container')) {
    fs.appendFileSync(cssPath, newCss, 'utf8');
    console.log('Added .mfg-grid-container CSS to globals.css');
} else {
    console.log('CSS already exists.');
}

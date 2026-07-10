const fs = require('fs');

let css = fs.readFileSync('src/styles/globals.css', 'utf8');

// Fix .awaken-images-col
css = css.replace(
    /\.awaken-images-col\s*\{\s*position:\s*relative;\s*height:\s*700px;/g,
    '.awaken-images-col {\n    position: relative;\n    height: 480px;'
);

// Fix .expertise-image-col
css = css.replace(
    /\.expertise-image-col\s*\{\s*position:\s*relative;\s*height:\s*650px;/g,
    '.expertise-image-col {\n    position: relative;\n    height: 400px;'
);

// Fix .quality-image-col
css = css.replace(
    /\.quality-image-col\s*\{\s*position:\s*relative;\s*height:\s*600px;/g,
    '.quality-image-col {\n    position: relative;\n    height: 400px;'
);

fs.writeFileSync('src/styles/globals.css', css, 'utf8');
console.log('Successfully adjusted container heights in globals.css');

const fs = require('fs');

let css = fs.readFileSync('src/styles/globals.css', 'utf8');

// Fix the cert positions
css = css.replace('.cert-2 { bottom: 30%; right: -30px;', '.cert-2 { bottom: 20%; right: -10px;');
css = css.replace('.cert-3 { bottom: 10%; left: 20px;', '.cert-3 { bottom: 25%; left: -20px;');

fs.writeFileSync('src/styles/globals.css', css);
console.log("Fixed cert positions to avoid the empty border-radius space.");

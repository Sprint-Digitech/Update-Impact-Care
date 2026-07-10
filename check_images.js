const fs = require('fs');

function getDimensions(file) {
    // Very basic hack to get dimensions using a simple approach or just log sizes
    const stats = fs.statSync(file);
    console.log(file + ' size: ' + stats.size);
}

getDimensions('public/assets/uploads/images/about-us/about-main.jpeg');
getDimensions('public/assets/uploads/images/about-us/about-secondary.jpeg');
getDimensions('public/assets/uploads/images/about-us/about-expertise.jpeg');
getDimensions('public/assets/uploads/images/about-us/about-quality.jpeg');

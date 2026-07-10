const fs = require('fs');
const content = fs.readFileSync('src/content/bodies/about-us.html', 'utf8');
const styleMatches = content.match(/<style[^>]*>([\s\S]*?)<\/style>/gi);
if (styleMatches) {
    fs.writeFileSync('temp_styles.css', styleMatches.join('\n\n'), 'utf8');
    console.log('Styles written to temp_styles.css');
} else {
    console.log('No styles found');
}

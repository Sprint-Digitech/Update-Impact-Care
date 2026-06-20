const fs = require('fs');
const path = require('path');
const bodiesDir = 'c:/Users/akkik/OneDrive/Desktop/New-Impact-Care/src/content/bodies';
const footerTsPath = 'c:/Users/akkik/OneDrive/Desktop/New-Impact-Care/src/components/sections/content/footer.ts';

const files = fs.readdirSync(bodiesDir).filter(f => f.endsWith('.html')).map(f => path.join(bodiesDir, f));
files.push(footerTsPath);

let fixedCount = 0;
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // Pattern we want to fix:
  //         </a>
  //         
  //                     2464 Royal Ln. Mesa, New Jersey                
  // 				</div>
  
  // Notice that "2464 Royal Ln. Mesa, New Jersey" can be any text.
  const badPattern = /(<\/a>\s*\n\s+)([\s\S]*?)(                \n\s*<\/div>\n\s*<\/div>)/g;
  
  content = content.replace(badPattern, (match, p1, p2, p3) => {
    // If the text matched is the address, we just replace it with the missing closing divs
    // The original closing divs were: </div></div></div>
    // Right now, the file has two `</div>` later? Wait, let's look at `footer.ts`.
    // Let's do a more robust regex that just targets the known messed up block.
    return match;
  });

}

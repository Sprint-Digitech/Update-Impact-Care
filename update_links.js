const fs = require('fs');
const path = require('path');
const bodiesDir = 'c:/Users/akkik/OneDrive/Desktop/New-Impact-Care/src/content/bodies';
const footerTsPath = 'c:/Users/akkik/OneDrive/Desktop/New-Impact-Care/src/components/sections/content/footer.ts';

const files = fs.readdirSync(bodiesDir).filter(f => f.endsWith('.html')).map(f => path.join(bodiesDir, f));
files.push(footerTsPath);

let modifiedCount = 0;
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // We are replacing the address block link.
  // Original is:
  //         <!-- link opening -->
  //                 <!-- end link opening -->
  // 
  //         <div class="elementskit-infobox text-left text-left icon-lef-right-aligin elementor-animation- media  ">
  //                     <div class="elementskit-box-header elementor-animation-">
  //                 <div class="elementskit-info-box-icon  text-center">
  //                     <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none"><path d="M14.9999 27C14.9999 27 24.3913 18.6522 24.3913 12.3913C24.3913 7.20463 20.1866 3 14.9999 3C9.81327 3 5.60864 7.20463 5.60864 12.3913C5.60864 18.6522 14.9999 27 14.9999 27Z"
  // ... and then we need to add </a> at the end.
  // Actually, the block looks like this:

  /*
        <div class="elementor-element elementor-element-8efbe37 footer-contact-item  ekit-equal-height-disable elementor-widget elementor-widget-elementskit-icon-box" data-id="8efbe37" data-element_type="widget" data-e-type="widget" data-settings="{&quot;ekit_we_effect_on&quot;:&quot;none&quot;}" data-widget_type="elementskit-icon-box.default">
				<div class="elementor-widget-container">
					<div class="ekit-wid-con" >        <!-- link opening -->
                <!-- end link opening -->

        <div class="elementskit-infobox text-left text-left icon-lef-right-aligin elementor-animation- media  ">
                    <div class="elementskit-box-header elementor-animation-">
                <div class="elementskit-info-box-icon  text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none"><path d="M14.9999 27C14.9999 27 24.3913 18.6522 24.3913 12.3913C24.3913 7.20463 20.1866 3 14.9999 3C9.81327 3 5.60864 7.20463 5.60864 12.3913C5.60864 18.6522 14.9999 27 14.9999 27Z" stroke="currentColor" stroke-width="2"></path><path d="M18.0003 12.0002C18.0003 13.657 16.6572 15.0002 15.0003 15.0002C13.3435 15.0002 12.0003 13.657 12.0003 12.0002C12.0003 10.3433 13.3435 9.00019 15.0003 9.00019C16.6572 9.00019 18.0003 10.3433 18.0003 12.0002Z" stroke="currentColor" stroke-width="2"></path></svg>
                </div>
          </div>
                        <div class="box-body">
                            <h3 class="elementskit-info-box-title">
                    2464 Royal Ln. Mesa, New Jersey                </h3>
                                            </div>
        
        
                </div>
        </div>				</div>
				</div>
  */

  // Let's do a strict replace
  const regex = /(<!-- link opening -->\s*)(<!-- end link opening -->)(\s*<div class="elementskit-infobox text-left text-left icon-lef-right-aligin elementor-animation- media  ">\s*<div class="elementskit-box-header elementor-animation-">\s*<div class="elementskit-info-box-icon  text-center">\s*<svg xmlns="http:\/\/www.w3.org\/2000\/svg" width="30" height="30" viewBox="0 0 30 30" fill="none"><path d="M14\.9999 27C14\.9999 27 24\.3913 18\.6522 24\.3913 12\.3913C24\.3913 7\.20463 20\.1866 3 14\.9999 3C9\.81327 3 5\.60864 7\.20463 5\.60864 12\.3913C5\.60864 18\.6522 14\.9999 27 14\.9999 27Z" stroke="currentColor" stroke-width="2"><\/path><path d="M18\.0003 12\.0002C18\.0003 13\.657 16\.6572 15\.0002 15\.0003 15\.0002C13\.3435 15\.0002 12\.0003 13\.657 12\.0003 12\.0002C12\.0003 10\.3433 13\.3435 9\.00019 15\.0003 9\.00019C16\.6572 9\.00019 18\.0003 10\.3433 18\.0003 12\.0002Z" stroke="currentColor" stroke-width="2"><\/path><\/svg>\s*<\/div>\s*<\/div>\s*<div class="box-body">\s*<h3 class="elementskit-info-box-title">([\s\S]*?)<\/h3>\s*<\/div>\s*<\/div>\s*)(<\/div>\s*<\/div>\s*<\/div>)/g;

  content = content.replace(regex, '$1<a href="/contact-us#map" class="ekit_global_links">\n                $2$3</a>\n        $4');

  // We should also replace the address in contact-us.html that we saw earlier, which was 
  // <h3 class="elementskit-info-box-title">210-302, Sector -9, Rohini, Delhi - 110085. INDIA</h3>
  // Wait, let's make the regex generic for the title text so it catches both strings! That's why I used ([\s\S]*?).

  // Also we need to add id="map" to contact-us.html
  if (file.endsWith('contact-us.html')) {
    const mapRegex = /(<div class="elementor-element elementor-element-898f5e4 e-con-full e-flex e-con e-child" data-id="898f5e4" data-element_type="container" data-e-type="container">\s*<div class="elementor-element elementor-element-0e8fb57 elementor-widget elementor-widget-google_maps" data-id="0e8fb57" data-element_type="widget" data-e-type="widget" data-settings="{&quot;ekit_we_effect_on&quot;:&quot;none&quot;}" data-widget_type="google_maps\.default">)/;
    content = content.replace(mapRegex, '<div id="map" class="elementor-element elementor-element-898f5e4 e-con-full e-flex e-con e-child" data-id="898f5e4" data-element_type="container" data-e-type="container">\n				<div class="elementor-element elementor-element-0e8fb57 elementor-widget elementor-widget-google_maps" data-id="0e8fb57" data-element_type="widget" data-e-type="widget" data-settings="{&quot;ekit_we_effect_on&quot;:&quot;none&quot;}" data-widget_type="google_maps.default">');
  }

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
  }
}

console.log('Modified files:', modifiedCount);

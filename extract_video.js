const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('old_video.html', 'utf16le');
const $ = cheerio.load(html);
const videoContainer = $('.elementor-background-video-container');
console.log(videoContainer.parent().attr('class'));
console.log(videoContainer.parent().attr('data-id'));
fs.writeFileSync('video_container.html', $.html(videoContainer));

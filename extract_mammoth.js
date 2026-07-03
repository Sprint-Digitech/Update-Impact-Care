const mammoth = require("mammoth");
const fs = require("fs");

mammoth.extractRawText({path: "d:/Downloads/IMPACT Product details (1).docx"})
    .then(function(result){
        const text = result.value; 
        fs.writeFileSync('d:/New-Impact-Care/docx_extract/clean_text.txt', text);
        console.log("Successfully extracted text.");
    })
    .catch(function(error) {
        console.error(error);
    });

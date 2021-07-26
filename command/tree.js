let fs = require("fs");
let path = require("path");
function treeFn(src) {
    console.log("tree command executed with path : " + src);

    let dPath = fs.lstatSync(src);
    let dName = path.basename(src);
    console.log("->" + dName);
    let filePath = fs.readdirSync(src)
    // console.log(filePath)
    for(let i = 0; i < filePath.length; i++){
        console.log("      " + "->" + filePath[i]);
    }
}

module.exports = {
    treefxn: treeFn
}
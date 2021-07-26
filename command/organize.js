let types = {
    media: ["mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}

let fs = require("fs");
let path = require("path");

function organizeFn(src) {
    console.log("organize  command executed with path: " + src);
    // code 
    let organizeFilePath = path.join(src,"organized_files");
    if(fs.existsSync(organizeFilePath) == false){
        fs.mkdirSync(organizeFilePath);
    }

    let allfiles =  fs.readdirSync(src);
    // console.log(allfiles);
    for(let i = 0; i < allfiles.length; i++){
        let allfilesAddress = path.join(src,allfiles[i]);
        let isFile = fs.lstatSync(allfilesAddress).isFile();
        if(isFile){
            // console.log(allfiles[i]);
            let category = getCategory(allfiles[i]);
            // console.log(allfiles[i],"belongs", category);

            // 

            let categoryPath = path.join(organizeFilePath,category);
            if(fs.existsSync(categoryPath) == false){
                fs.mkdirSync(categoryPath);
            }
            let fileName = path.basename(allfilesAddress);
            let destFilePath = path.join(categoryPath,fileName);
            fs.copyFileSync(allfilesAddress,destFilePath);
            console.log(fileName, " copy to ", category);
            
            
            
        }
    }
}

function getCategory(filename){
    let ext = path.extname(filename);
            // console.log(ext);
            ext = ext.slice(1);
            
            for(let type in types){
                let currentTypeArr = types[type];
                for(let j = 0; j < currentTypeArr.length; j++){
                    if(ext == currentTypeArr[j]){
                        return type;
                    }
                }
                
                
            }
            return "others";
}
module.exports = {
    organizefxn: organizeFn
}
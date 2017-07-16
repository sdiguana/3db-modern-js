let fs = require("fs"),     //these are Node BuiltIn Modules
    path = require("path");

let directory = "./documents";  //alias out the directory since it will be called more than once
console.log("start");
//Async:
fs.readdir(directory,function (err,files) {     //common convention, callback last param, err followed by data
    if(err) {console.error(err); return; }  //always check error first
    for(let i=0; i<files.length;i++) {
        let file = files[i];
        console.log(file);
        let contentBuffer = fs.readFileSync(path.join(directory,file));  //adding sync at the end creates the SYNC version of code
        console.log(contentBuffer.toString());
        console.log("---------------------");
    }
});

console.log("end");
var http = require("http"),
    querystring = require("querystring"),
    fs = require("fs"),
    path = require("path"),
    url = require("url");

let directory = "./documents";
let invalidFileRegex = /^[.\/\\]|\.\./;

var server = http.createServer(function (req,res) {
    //res.write("hi");    // res = result is a stream which accepts data
    //res.end();
    if(req.method == "POST"){
        handlePost(req,res);
        return;
    }
    let query = url.parse(req.url, true).query;
    console.log(query); // writes to console the qString. the empty curlies are the browser trying to get favicon
    if(query.file) {
        writeFile(req,res,query);
        return;
    }
    writeIndex(req,res);
});



function writeIndex(req,res) {
    res.writeHead(200,{"Content-Type": "text/html"});
    fs.readdir(directory, function (err,files) {
       if(err) {res.end(err); return;}
        var fileListHtml = "";
       for(var i=0; i<files.length; i++) {
           var file = files[i];
           fileListHtml += `<li><a href="?file=${file}">${file}</a></li>`;
       }
       res.end(`
       <ul>
       ${fileListHtml}
       </ul>
       <form method="POST">
       <input type="text" name="file"/>
       <textarea name="text"></textarea>
       <input type="submit"/>
       </form>
       `);
    });
}
function writeFile(req,res,query) {
    if(invalidFileRegex.test(query.file)) {
        writeText(res, 400,"invalid filename");
        return;
    }
    var filename = path.join(directory, query.file);
    fs.readFile(filename, function (err,buffer) {
        if(err) {writeText(res,400,err); return;}
        writeText(res,200,buffer.toString());
    });
}

function handlePost(req,res) {
    var body = "";
    //the req is a steam -- this fn aggregates it as it comes in
    req.on("data",function (data) {
        body+=data;
    });
    req.on("end", function () { // process the data once it has all arrived
        var form = querystring.parse(body);
        if(!form.file || invalidFileRegex.test(form.file)) {
            writeText(res,400,"invalid Path")
        }
        try {
            fs.writeFileSync(path.join(directory, form.file), form.text);
            writeIndex(req,res);
        } catch (ex) {
            writeText(res,400,"could not save file");
            console.error(ex);
        }
    });
}

function writeText(res,status,text) {
    res.writeHead(status, {"Content-Type": "text/plain"});
    res.end(text);
}

server.listen(4000);
console.log("server is on 4000");
//run file then can goto localhost:4000 and see the webpage
//node will run continuously until CTRL+C

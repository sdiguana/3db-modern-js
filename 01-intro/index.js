//require("./calculator"); // this loads and runs the file referenced
console.log("hello world");
var calc = require("./calculator"); // you could do .add if you only want the add function
//console.log(calc);
var result = calc.add(10,20);
console.log(result);
var res2 = calc.sub(20,10);
console.log(res2);
var svc = require("./services/service");
console.log(svc);

var stuff = require("./services"); // gets the index file for this folder
console.log(stuff.hey);
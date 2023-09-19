
var express = require('express');
var app = express();
const port=5000
const fs=require("fs");
app.get('/', function (req, res) {
   
res.send("Node js File System!!");
//timeStamp
const timestamp = Date.now();
 // timestamp in milliseconds
//console.log(timestamp);
 // timestamp in seconds
const fileContent=Math.floor(timestamp/1000)
console.log("file Content",fileContent);
const data=fileContent.toString();
//current date time 
const dateObject = new Date();
const date = (`0${dateObject.getDate()}`).slice(-2);
const month = (`0${dateObject.getMonth() + 1}`).slice(-2);
const year = dateObject.getFullYear();
const hours = dateObject.getHours();
const minutes = dateObject.getMinutes();
const seconds = dateObject.getSeconds();
let currDtTime=`${date}-${month}-${year}_T_${hours}_${minutes}_${seconds}`;
let filename=currDtTime.toString();
console.log(`currentDateTime ${currDtTime}`);
//writing file


fs.writeFile(`${filename}.txt`, data, err => {
   if (err) {
     console.error(err);
   }
});

});
app.listen(port,()=>console.log("successfully Port running",port));
var express = require("express");
    app = express(),
    http = require("http").Server(app).listen(3002),
    upload = require("express-fileupload"),
    bodyParser = require('body-parser'),
    path = require('path'),
    Db = require('mongodb').Db,
    Server = require('mongodb').Server;
app.use(upload())
var mongo = require('mongodb').MongoClient;
const session = require('express-session');
var fs = require('fs');
var db;

mongo.connect('mongodb://127.0.0.1:27017/test',function (err, database) {
  //if (err) return console.log(err);
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to database');
  } 
  db = database;
  db.createCollection('fileupload', function(err, collection){
      if(err){
          console.log('unsuccessful');
      }
      else {
          console.log('successful'); 
      }
  });
  //db.fileupload.find();
 //db.close();
  
});

console.log("server started")
app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html");
})


app.post("/api/files", function(req,res){
    if(req.files){
        var file = req.files.filename,
            filename = file.name;

            db.collection('fileupload').insert(file);
        
        file.mv("./upload/"+filename,function(err){
            if(err){
                console.log(err)
                res.send("error occured")
            }
            else{
                res.send("Done!")
            }
        })
    }
    
})

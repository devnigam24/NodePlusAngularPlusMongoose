"use strict";


/*jshint esversion: 6 */
"use strict";
var mongoose = require("mongoose");
var MongoClient = mongoose.MongoClient;
var express = require("express");
var app = express();
app.use(express.static("."));
var bodyparser = require("body-parser");
var http = require("http");
app.use(bodyparser.json());



//file upload
// index.js start of file
var multer = require('multer'),
	path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

var upload = multer({ storage: storage });




app.use(express.static("."));
app.use(bodyparser.json({ type: 'application/*+json' }));
app.use(bodyparser.urlencoded({ extended: false }));

////////// ROUTES ///////////////
app.get('/', function(req,res){
   res.sendFile(__dirname+"/index.html");
});

//User Data

app.post('/postUserData', function(req,res) {

    var conn1 = mongoose.createConnection("mongodb://localhost:27017/rdb", function(error, success){
                                                      if(error){
                                                          console.log("Error connecting to database: \n" + error);
                                                      }
                                                      else{
                                                          console.log('Connected to Database');
                                                      }
                                                  });;


    var userSchema = mongoose.Schema({
        fname: String,
        lname: String,
        email1: String,
        phone: String,
        address1: String,
        zip: String
    });
    var oneUser = conn1.model(req.body.email1, userSchema);
    var tempUser = new oneUser({
        fname: req.body.fname,
        lname: req.body.lname,
        email1: req.body.email1,
        phone: req.body.phone,
        address1: req.body.address1,
        zip: req.body.zip
    });

    tempUser.save(function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("user Successfully Saved!");
        mongoose.connection.close();
        res.json(tempUser);
    });
    
});


//User Experience

app.post('/postUserjobx', function(req,res) {
    var conn2 = mongoose.createConnection("mongodb://localhost:27017/xdb", function(error, success){
        if(error){
            console.log("Error connecting to database: \n" + error);
        }
        else{
            console.log('Connected to Database');
        }
    });
    var userJobSchema = mongoose.Schema({
        companyName: String,
        title: String,
        location: String,
        desc: String,
    });
    var oneJob = conn2.model(userInSessionObject.emailID, userJobSchema);
    var tempUser = new oneJob({
        companyName: req.body.companyName,
        title: req.body.title,
        location: req.body.location,
        desc: req.body.desc
    });
    console.log(req.body);

    tempUser.save(function(err) {
        if (err) {
            return console.log(err);
        }
        mongoose.connection.close();
        console.log("user Successfully Saved!");
        res.json(tempUser);
    });
    
});


//User Achievements

app.post('/postUserAchievement', function(req,res) {
    var conn3 = mongoose.createConnection("mongodb://localhost:27017/userAchievementsDB", function(error, success){
        if(error){
            console.log("Error connecting to database: \n" + error);
        }
        else{
            console.log('Connected to Database');
        }
    });
    var userAchievementSchema = mongoose.Schema({
        achievementName : String,
        achievementTitle : String,
        achievementAward : String,
        achievementDesc : String
    });
    var oneJob = conn3.model(userInSessionObject.emailID, userAchievementSchema);
    var tempUser = new oneJob({
        achievementName: req.body.achievementName,
        achievementTitle: req.body.achievementTitle,
        achievementAward: req.body.achievementAward,
        achievementDesc: req.body.achievementDesc
    });
    console.log(req.body);

    tempUser.save(function(err) {
        if (err) {
            return console.log(err);
        }
        mongoose.connection.close();
        console.log("user Successfully Saved!");
        res.json(tempUser);
    });
});


//User Education
app.post('/postUserEducation', function(req,res) {
    var conn4 = mongoose.createConnection("mongodb://localhost:27017/userEducationDB", function(error, success){
        if(error){
            console.log("Error connecting to database: \n" + error);
        }
        else{
            console.log('Connected to Database');
        }
    });
    var userEducationSchema = mongoose.Schema({
        schoolName : String,
        degree: String,
        major: String,
        city: String,
        state: String,
        zip : String,
    });
    var oneJob = conn4.model(userInSessionObject.emailID, userEducationSchema);
    var tempUser = new oneJob({
        schoolName: req.body.schoolName,
        degree: req.body.degree,
        major: req.body.major,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip
    });
    console.log(req.body);

    tempUser.save(function(err) {
        if (err) {
            return console.log(err);
        }
        mongoose.connection.close();
        console.log("user Successfully Saved!");
        res.json(tempUser);
    });
});


//user Projects

app.post('/postUserProject', function(req,res) {
    var conn5 = mongoose.createConnection("mongodb://localhost:27017/userProjectDB", function(error, success){
        if(error){
            console.log("Error connecting to database: \n" + error);
        }
        else{
            console.log('Connected to Database');
        }
    });
    var userProjectSchema = mongoose.Schema({
        projectName: String,
        projectWebsite: String,
        projectDesc: String,
        fileName: String
    });
    var oneJob = conn5.model(userInSessionObject.emailID, userProjectSchema);
    var tempUser = new oneJob({
        projectName: req.body.projectName,
        projectWebsite: req.body.projectWebsite,
        projectDesc: req.body.projectDesc,
        //desc: req.body.desc
    });
    console.log(req.body);

    tempUser.save(function(err) {
        if (err) {
            return console.log(err);
        }
        mongoose.connection.close();
        console.log("user Successfully Saved!");
        res.json(tempUser);
    });
});


// User Skills
app.post('/postUserSkill', function(req,res) {
    var conn6 = mongoose.createConnection("mongodb://localhost:27017/userSkillDB", function(error, success){
        if(error){
            console.log("Error connecting to database: \n" + error);
        }
        else{
            console.log('Connected to Database');
        }
    });
    var skillSchema = mongoose.Schema({
        skills: [String]
    });
    var oneJob = conn6.model(userInSessionObject.emailID, skillSchema);
    var tempUser = new oneJob({
        skills: req.body
    });
    tempUser.save(function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("user Successfully Saved!");
        mongoose.connection.close();
        res.json(tempUser);
    });
    
});


// get the User Information
app.get('/getUserData/:email1', function(req,res) {

    var conn1 = mongoose.createConnection("mongodb://localhost:27017/rdb", function(error, success){
                                                      if(error){
                                                          console.log("Error connecting to database: \n" + error);
                                                      }
                                                      else{
                                                          console.log('Connected to Database');
                                                      }
                                                  });;


    var userSchema = mongoose.Schema({
        fname: String,
        lname: String,
        email1: String,
        phone: String,
        address1: String,
        zip: String
    });
    console.log(req.params.email1);
    var oneUser = conn1.model(req.params.email1, userSchema);

    oneUser.find(function(err, success) {
      if (err) return console.error(err);
      console.log(success);
      mongoose.connection.close();
      res.send(success);
    });
});

// get the Job Experience Information
app.get('/getUserjobx/:email1', function(req,res) {
    var conn2 = mongoose.createConnection("mongodb://localhost:27017/xdb", function(error, success){
        if(error){
            console.log("Error connecting to database: \n" + error);
        }
        else{
            console.log('Connected to Database');
        }
    });
    var userJobSchema = mongoose.Schema({
        companyName: String,
        title: String,
        location: String,
        desc: String,
    });
    var oneJob = conn2.model(req.params.email1, userJobSchema);

    oneJob.find(function(err, success) {
          if (err) return console.error(err);
          console.log(success);
          mongoose.connection.close();
          res.send(success);
        });

});

//Get the USer Skills
app.get('/getUserSkill/:email1', function(req,res) {
    var conn6 = mongoose.createConnection("mongodb://localhost:27017/userSkillDB", function(error, success){
        if(error){
            console.log("Error connecting to database: \n" + error);
        }
        else{
            console.log('Connected to Database');
        }
    });
    var skillSchema = mongoose.Schema({
        skills: [String]
    });
    var oneJob = conn6.model(userInSessionObject.emailID, skillSchema);
    oneJob.find(function(err, success) {
              if (err) return console.error(err);
              console.log(success);
              mongoose.connection.close();
              res.send(success);
            });
});

// Get the User Projects

app.get('/getUserProject/:email1', function(req,res) {
    var conn5 = mongoose.createConnection("mongodb://localhost:27017/userProjectDB", function(error, success){
        if(error){
            console.log("Error connecting to database: \n" + error);
        }
        else{
            console.log('Connected to Database');
        }
    });
    var userProjectSchema = mongoose.Schema({
        projectName: String,
        projectWebsite: String,
        projectDesc: String,
         fileName: String,
    });
    var oneJob = conn5.model(userInSessionObject.emailID, userProjectSchema);
    oneJob.find(function(err, success) {
                  if (err) return console.error(err);
                  console.log(success);
                  mongoose.connection.close();
                  res.send(success);
                });
});

//Get the User Education

app.get('/getUserEducation/:email1', function(req,res) {
    var conn4 = mongoose.createConnection("mongodb://localhost:27017/userEducationDB", function(error, success){
        if(error){
            console.log("Error connecting to database: \n" + error);
        }
        else{
            console.log('Connected to Database');
        }
    });
    var userEducationSchema = mongoose.Schema({
        schoolName : String,
        degree: String,
        major: String,
        city: String,
        state: String,
        zip : String,
    });
    var oneJob = conn4.model(userInSessionObject.emailID, userEducationSchema);
    oneJob.find(function(err, success) {
                     if (err) return console.error(err);
                     console.log(success);
                     mongoose.connection.close();
                     res.send(success);
                   });
});

//Get User Achievements

app.get('/getUserAchievement/:email1', function(req,res) {
    var conn3 = mongoose.createConnection("mongodb://localhost:27017/userAchievementsDB", function(error, success){
        if(error){
            console.log("Error connecting to database: \n" + error);
        }
        else{
            console.log('Connected to Database');
        }
    });
    var userAchievementSchema = mongoose.Schema({
        achievementName : String,
        achievementTitle : String,
        achievementAward : String,
        achievementDesc : String
    });
    var oneJob = conn3.model(userInSessionObject.emailID, userAchievementSchema);
    oneJob.find(function(err, success) {
                         if (err) return console.error(err);
                         console.log(success);
                         mongoose.connection.close();
                         res.send(success);
                       });
});


var userInSessionObject = {};
app.post("/updateUserEmailID",function(req,res){
    console.log("aayaaaaaa"+req.body.emailID);
    userInSessionObject = {"emailID":req.body.emailID,"name":req.body.name};
    res.send(userInSessionObject);
});

app.get("/updateUserEmailID",function(req,res){
    res.send(userInSessionObject);
});

app.post("/fileUpload",function(req,res){
    console.log("file here "+req.body);
    res.send(req.body);
});


app.post('/multer', upload.single('file'),function(req,res){
    console.log(req);
    res.send("Success");
});

//////// SERVER CONNECTION ///////////
http.createServer(app).listen(3000, function(){
    console.log('Server listening on port 3000');
});

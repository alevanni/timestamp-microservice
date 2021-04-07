// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var runner = require('./test-runner');
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
app.get("/api/timestamp/:date_string?", function(req, res){
  var input= req.params.date_string;
  var regex=/[^0-9]/g; //non numbers
  var myDate;
  if (input==null) myDate=new Date(); //no input
  
  else if (!regex.test(input)) myDate= new Date(parseInt(input)); //there are only numbers
  else if  (new Date(input)== "Invalid Date") res.json({"error" : "Invalid Date" }); // tha format is invalid
  else  myDate= new Date(input); 
  res.json({"unix": myDate.getTime(), "utc" : myDate.toUTCString() });
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
  
  //start testing
  if(process.env.NODE_ENV==='test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      } catch(e) {
        var error = e;
          console.log('Tests are not valid:');
          console.log(error);
      }
    }, 1500);
  }
});

module.exports = app; 
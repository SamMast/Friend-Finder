// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Arrays
// =============================================================
var users = [
  {
    "name": "Yoda",
    "photo": "https://vignette.wikia.nocookie.net/starwars/images/d/d6/Yoda_SWSB.png/revision/latest?cb=20150206140125",
    "scores": [
    	"1",
    	"2",
    	"3",
    	"4",
    	"5",
    	"4",
    	"3",
    	"2",
    	"1",
    	"5"
    ]
  }
];

// Routes
// =============================================================

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/app/public/home.html"));
});

app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "/app/public/survey.html"));
});


app.get("/api/friends", function(req, res) {
  return res.json(users);
});

app.post("/api/friends", function(req, res) {

  var newFriend = req.body;

  console.log(newFriend);

  var array = [];

  for (var i = 0; i < users.length; i++) {

  	var answers = users[i].scores;
  	var newAnswers = newFriend.scores;

  	for (var j = 0; j < answers.length; j++) {

  		var newScore = newAnswers[j];
  		var userScore = answers[j];
  		
  		console.log(newScore);
  		console.log(userScore);
  		// var subtraction = (parseInt(newScore) - parseInt(userScore));
  		// var difference = Math.abs(subtraction);
  		// array.push(difference);
  		// console.log(array);
  	}
  }

  users.push(newFriend);

  res.json(newFriend);

});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

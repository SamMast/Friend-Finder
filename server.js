// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Arrays
// =============================================================
var users = [
  {
    "name": "Yoda",
    "photo": "https://vignette.wikia.nocookie.net/starwars/images/d/d6/Yoda_SWSB.png/revision/latest?cb=20150206140125",
    "scores[]": [
    	"1",
    	"2",
    	"3",
    	"1",
    	"1",
    	"1",
    	"1",
    	"1",
    	"1",
    	"1"
    ]
  },
  {
    "name": "Bob",
    "photo": "https://vignette.wikia.nocookie.net/fantendo/images/1/18/Bob-the-Builder-edit.jpg/revision/latest?cb=20130820220201",
    "scores[]": [
      "3",
      "5",
      "4",
      "5",
      "5",
      "5",
      "5",
      "5",
      "5",
      "5"
    ]
  }
];

function compare(x) {
  var newBestFriend = 40;
  var index = 0;
  for (var i = 0; i < users.length; i++) {
    var total = 0;
    var answers = users[i]["scores[]"];
    var newAnswers = x[0]["scores[]"];

    for (var j = 0; j < answers.length; j++) {

      var userScore = answers[j];
      var newScore = newAnswers[j]
      
      var subtraction = (parseInt(newScore) - parseInt(userScore));
      var difference = Math.abs(subtraction);

      total += parseInt(difference);
    }
    console.log("TOTAL: " + total);

    if (total < newBestFriend) {
      newBestFriend = total;
      index = i;
    }
  }

  return index;
}

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

  var newArray = [];
  newArray.push(newFriend);

  res.json(users[compare(newArray)]);

  users.push(newFriend);


});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

// LOAD DATA
// ===============================================================================

var users = require("../data/friends.js");


// ROUTING
// ===============================================================================

module.exports = function(app) {
 
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

};

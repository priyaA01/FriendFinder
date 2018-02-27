var friends = require("../data/friends");


module.exports = function (app) {

  app.get("/api/friends", function (req, res) {
    res.json(friends);
  });


  app.post("/api/friends", function (req, res) {

    var friendMatch = {
      name: "",
      photo: "",
      friendDifference: 100
    };
    var userData = req.body;
    var userName = userData.name;
    var userPhoto = userData.photo;
    var userScores = userData.scores;
    var totalDifference = 0;
    console.log(req.body);
    //loop through scores of survery
    for (var i = 0; i < friends.length; i++) {
     // console.log(friends[i].name);
      totalDifference = 0;
      // loop throught to calculate difference
      for (var j = 0; j < 10; j++) {
        totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));
        if (totalDifference <= friendMatch.friendDifference) {
          friendMatch.name = friends[i].name;
          friendMatch.photo = friends[i].photo;
          friendMatch.friendDifference = totalDifference;
        }
      }
    }

    friends.push(userData);
    res.json(friendMatch);

  });

};
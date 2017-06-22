var path = require("path");
var friendInfo = require("../data/friends.js");

module.exports = function(app){
  app.get("/api/friends", function(req, res){
    res.json(friendInfo);
  });

  app.post("/api/friends", function(req, res){
    console.log(req.body);

    var minDiff = 1000;
    var bestFriend = -1;
    for(var i=0; i<friendInfo.length; i++){
      var diff = 0;
      for(var j=0; j<req.body.scores.length; j++){
        diff = diff + Math.abs(req.body.scores[j] - friendInfo[i].scores[j]);
      }
      if(diff < minDiff){
        minDiff = diff;
        bestFriend = i;
      }
    }
    friendInfo.push(req.body);
    res.json(friendInfo[bestFriend]);
  });
};
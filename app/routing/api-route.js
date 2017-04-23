
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendData = require("../data/friends.js");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friendData);
  });

  
  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    console.log("request is "  + req.body.scores);

    var bestMatchName, bestMatchPhoto;
    var bestMatchScore = 1000;

    var newUserScoreArray = req.body.scores;
    for(var i=0; i<friendData.length; i++)
    {
      var matchScore = computeMatchScore(newUserScoreArray, friendData[i].scores);
      if(matchScore && matchScore < bestMatchScore)
      {
        bestMatchScore = matchScore;
        bestMatchName = friendData[i].name;
        bestMatchPhoto = friendData[i].photo;
      }
    }
    friendData.push(req);
    res="Pankaj";
    //res.body = {"bestMatchName":bestMatchName, "bestMatchPhoto":bestMatchPhoto};
    console.log("Bestmatch name is: " + bestMatchName );
    console.log("Bestmatch photo is: " + bestMatchPhoto );
    console.log("Response is: " + res.body );
  });

  function computeMatchScore(scoreArray1, scoreArray2)
  {
    console.log("scores inputs are: " + scoreArray1 + ", " + scoreArray2 );
    if(scoreArray1.length!=scoreArray2.length) return null;
    var matchScore = 0;
    console.log("Came here");
    for(var i=0; i<scoreArray1.length; i++)
    {
      console.log("And here"); 
      var diff = Math.abs(scoreArray1[i]-scoreArray2[i]);
      console.log("Diff is: " + diff);
      matchScore += diff;
      console.log("Matchscore is: " + matchScore);
    }
   
    console.log("Matchscore is: " + matchScore);
    return matchScore;
  }

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  // app.post("/api/clear", function() {
  //   // Empty out the arrays of data
  //   friendData = [];
  

  //   console.log(friendData);
  // });
};

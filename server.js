var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

//express app
var app = express();
var PORT = process.env.PORT || 8080;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//routes


require("./app/routing/api-route")(app);
require("./app/routing/html-route")(app);



app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});

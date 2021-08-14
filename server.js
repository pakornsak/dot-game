//@ts-check
const express = require("express");
const app = express();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));
app.use(express.static("/tmp"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

const listener = app.listen(process.env.PORT || 3000, function () {
  // @ts-ignore
  console.log("Your app is listening on port " + listener.address().port);
});

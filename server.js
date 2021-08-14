//@ts-check
const express = require("express");
const sassMiddleware = require("node-sass-middleware");
const path = require("path");
const app = express();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));
app.use(express.static("/tmp"));

console.log("__dirname", __dirname);
app.use(
  sassMiddleware({
    /* Options */
    src: path.join(__dirname, "sass"),
    dest: path.join(__dirname, "public"),
    debug: true,
    outputStyle: "compressed",
    prefix: "", // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
  })
);

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

const listener = app.listen(process.env.PORT || 3000, function () {
  // @ts-ignore
  console.log("Your app is listening on port " + listener.address().port);
});

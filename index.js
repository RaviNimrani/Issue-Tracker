const port = 8000;
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");

app.use(express.urlencoded({ extended: true }));

app.use(express.static("./assets"));
// Use Express Layout
app.use(expressLayouts);
// for extract other ejs files to layouts
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//use Router
app.use("/", require("./routes"));

app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(port, function (err) {
  if (err) {
    console.log("there is an error");
    return;
  }
  console.log("SuccessFully Running on Port", port);
});

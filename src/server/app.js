const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const Request = require("request");
var cors = require("cors");

const PORT = 8080;
const STATIC_ASSETS_PATH = path.resolve(`${__dirname}/../../static`);

const app = express();

// Serve front end assets which have been built by webpack
app.use("/static", express.static(STATIC_ASSETS_PATH));
app.use(cookieParser());

app.get("/", (request, response) => {
  response.redirect("/guest/");
});

app.get("/*", (request, response) => {
  response.sendFile(path.join(__dirname + "../../index.html"));
});

app.listen(PORT, () =>
  console.log(
    `Example app listening on port ${PORT}.\n\nLoad it in your browser at http://localhost:${PORT}`
  )
);

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const Request = require("request");
var cors = require("cors");
const https = require("https");
const fs = require("fs");

const authCheck = require('./authCheck')

const PORT = 8080;
const STATIC_ASSETS_PATH = path.resolve(`${__dirname}/../../static`);

const app = express();

const options = {
  key: fs.readFileSync("src/server/key.pem"),
  cert: fs.readFileSync("src/server/cert.pem"),
};

const server = https.createServer(options, app);

// Serve front end assets which have been built by webpack
app.use("/static", express.static(STATIC_ASSETS_PATH));
app.use(cookieParser());
app.use(cors());

app.get("/", (request, response) => {
  response.redirect("/guest/");
});

app.get("/*", (request, response) => {
  // console.log(request.cookies.accessToken)
  // console.log(request.path)
  let reqPath = request.path.toLowerCase()
  if (reqPath.includes("guest") == false) {
    authCheck.authCheck(request.cookies.accessToken)
    .then((result) => {
      // console.log(result);
      let type = request.cookies.userType;
      if (reqPath.includes("coach") && type == "Coach") {
        response.sendFile(path.join(__dirname + "../../index.html"));
      } else if (reqPath.includes("client") && type == "Client") {
        response.sendFile(path.join(__dirname + "../../index.html"));
      } else if (reqPath == "/guest/login" && reqPath == "/guest/coachlogin") {
        response.sendFile(path.join(__dirname + "../../index.html"));
      } else if (reqPath.includes("admin") && type == "Admin") {
        response.sendFile(path.join(__dirname + "../../index.html"));
      } else {
        response.redirect("/"+type+"/");
      }
    })
    .catch((err) => {
      // console.log(err);
      response.redirect("/");
    })
    
  } else {
    response.sendFile(path.join(__dirname + "../../index.html"));
  }
});

//Change server to app for http
app.listen(PORT, () =>
  console.log(
    `Example app listening on port ${PORT}.\n\nLoad it in your browser at http://localhost:${PORT}`
  )
);

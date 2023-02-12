const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const Request = require("request");
var cors = require("cors");
const https = require("https");
const fs = require("fs");

const authCheck = require("./authCheck");

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
  // let reqPath = request.path.toLowerCase()
  // let accessToken = "eyJraWQiOiJQMllFV1J3T0t2bHUydmRUK3gzVUZPQUJEakg0dlFURVRlN295TkVVYlwvUT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI5MmU3NTdmOS1jMmUxLTQ5MzYtODJiNS04NmVlODdlNjQxM2EiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGhlYXN0LTEuYW1hem9uYXdzLmNvbVwvYXAtc291dGhlYXN0LTFfNWF6aDdxSFBWIiwiY2xpZW50X2lkIjoiMWQ2YW5rODBwODg4bmVnODVidGM1YW4zczgiLCJvcmlnaW5fanRpIjoiNWE1NDczOTgtZjUwZC00YmM2LTkzMmItYTUyYzhjOTRlNTRiIiwiZXZlbnRfaWQiOiJmN2U3MzMwYy01MWI4LTQ3NjktYWZlNC1jMTA0MGY0MTEyNjQiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNjc1NTgwNjg5LCJleHAiOjE2NzU2MDMxNTksImlhdCI6MTY3NTU5OTU2MCwianRpIjoiY2U0YTc4Y2MtMTIyZS00Y2MzLWFhN2MtYzNiNzkyOGY4ZjYzIiwidXNlcm5hbWUiOiI5MmU3NTdmOS1jMmUxLTQ5MzYtODJiNS04NmVlODdlNjQxM2EifQ.V1ZN8aFCxey98YSJ3LR2zP2xLqi6bUJ4qJoaP8IDf913DQvswTU1XsLNEt6cAMgUvvOJqZTOQNwxARe5N6YqgDv1CDQBDsKiGZaa3jpLFMgNK5k6bTTwyME2Eb0EfGSqThyp9VmZ-tMRBmU5-EkOJBc9YsrMy2pRDEw5SYnnCFc00Kw58J2yHIik4iG1AWRXOEBYzycS5QOfNzKOBg5URSVdv1b4X212vW59ZjbR1VuuRwHLLv4YmECnZ0vmKZxXAO7TPVIYvg6tmwKWHZg7AeCzXxvfe2B9UtS1ToD-V25LSwM1X78r5pduNspFf6OoHZv2LI41pk2O9nQDhjMlsg";
  // if (reqPath.includes("guest") == false) {
  //   authCheck.authCheck(request.cookies.accessToken)
  //   .then((result) => {
  //     // console.log(result);
  //     let type = request.cookies.userType;
  //     if (reqPath.includes("coach") && type == "Coach") {
  //       response.sendFile(path.join(__dirname + "../../index.html"));
  //     } else if (reqPath.includes("client") && type == "Client") {
  //       response.sendFile(path.join(__dirname + "../../index.html"));
  //     } else if (reqPath == "/guest/login" && reqPath == "/guest/coachlogin") {
  //       response.sendFile(path.join(__dirname + "../../index.html"));
  //     } else if (reqPath.includes("admin") && type == "Admin") {
  //       response.sendFile(path.join(__dirname + "../../index.html"));
  //     } else {
  //       response.redirect("/"+type+"/");
  //     }

  //   })
  //   .catch((err) => {
  //     // console.log(err);
  //     response.redirect("/");
  //   })

  // } else {
  response.sendFile(path.join(__dirname + "../../index.html"));
  // }
});

//Change server to app for http
app.listen(PORT, () =>
  console.log(
    `Example app listening on port ${PORT}.\n\nLoad it in your browser at http://localhost:${PORT}`
  )
);

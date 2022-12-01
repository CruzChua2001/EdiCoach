const express = require("express");
const path = require("path");
var cors = require('cors');

const PORT = 3001;
const STATIC_ASSETS_PATH = path.resolve(`${__dirname}/../../static`);

const app = express();

// app.use(
// 	cors({origin: ['http://localhost:3001', 'http://127.0.0.1:3001', 'https://6i1lbzm98l.execute-api.us-east-1.amazonaws.com']})
//   );

// Serve front end assets which have been built by webpack
app.use("/static", express.static(STATIC_ASSETS_PATH));

app.get("/", (request, response) => {
	response.redirect("/guest/home")
});

app.get("/guest/", (request, response) => {
	response.redirect("/guest/home")
});

app.get("/guest/*", (request, response) => {
	response.sendFile(path.join(__dirname + '/view/guest/index.html'));
});

app.get("/client/*", (request, response) => {
	response.sendFile(path.join(__dirname + '/view/client/index.html'));
});

app.get("/coach/", (request, response) => {
	response.redirect("/coach/appointment")
})

app.get("/coach/*", (request, response) => {
	response.sendFile(path.join(__dirname + '/view/coach/index.html'));
});

app.get("/admin/*", (request, response) => {
	response.sendFile(path.join(__dirname + '/view/admin/index.html'));
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}.\n\nLoad it in your browser at http://localhost:${PORT}`))

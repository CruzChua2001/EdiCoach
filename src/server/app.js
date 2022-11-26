const express = require("express");
const path = require("path");

const PORT = 3001;
const STATIC_ASSETS_PATH = path.resolve(`${__dirname}/../../static`);

const app = express();

// Serve front end assets which have been built by webpack
app.use("/static", express.static(STATIC_ASSETS_PATH));

app.get("/", (request, response) => {
	response.redirect("/guest/home")
});

app.get("/guest/*", (request, response) => {
	response.sendFile(path.join(__dirname + '/view/guest/index.html'));
});

app.get("/client/*", (request, response) => {
	response.sendFile(path.join(__dirname + '/view/client/index.html'));
});

app.get("/coach/*", (request, response) => {
	response.sendFile(path.join(__dirname + '/view/coach/index.html'));
});

app.get("/admin/*", (request, response) => {
	response.sendFile(path.join(__dirname + '/view/admin/index.html'));
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}.\n\nLoad it in your browser at http://localhost:${PORT}`))

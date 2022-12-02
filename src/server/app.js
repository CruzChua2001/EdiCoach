const express = require("express");
const path = require("path");
const cookieParser = require('cookie-parser');
const Request = require('request');
var cors = require('cors');

const PORT = 3001;
const STATIC_ASSETS_PATH = path.resolve(`${__dirname}/../../static`);

const app = express();

// app.use(
// 	cors({origin: ['http://localhost:3001', 'http://127.0.0.1:3001', 'https://6i1lbzm98l.execute-api.us-east-1.amazonaws.com']})
//   );

// Serve front end assets which have been built by webpack
app.use("/static", express.static(STATIC_ASSETS_PATH));
app.use(cookieParser());

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
	console.log(request.cookies);
	let cookie = request.cookies;
	if (Object.keys(request.cookies).length === 0 ) {
		console.log("Not authorized");
		response.redirect("/guest/home");
	} else {
		Request.get('https://1b46sbaptd.execute-api.us-east-1.amazonaws.com/dev/get/'+cookie.sessionId,function(err,res,body){
			if(err) {
				console.log(err);
			}
			if(res.statusCode === 200 ) {
				var data = JSON.parse(body);
				if (data["status"] == "success" && data.message.UserType.S == "Admin") {
					response.sendFile(path.join(__dirname + '/view/admin/index.html'));
					
				} else {
					response.redirect("/guest/home");
					
				}
			}
			});
	}
	// response.sendFile(path.join(__dirname + '/view/admin/index.html'));
	
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}.\n\nLoad it in your browser at http://localhost:${PORT}`))

// use npm install [name] --save to install required modules
// use npm install [name] -g to install global modules like "nodemon", this is used to restart server automatically whenever a change is made to the code
// instead of npm [app name], this can be used by just nodemon command

// for loading any file in html, such as image, javascript use ../[filename], place it in public folder

// var can be used instead of const

// these are the modules(libraries) used
const http = require('http');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const hostname = process.env.HOST || 'localhost';
// port for heroku or 9000
const port = process.env.PORT || 9000;

// this is middle-ware. i.e, this has access to res and req and also next
const logger = function(req, res, next) {
	console.log("Logging...");
	next();
}

// either http or express can be used, express is advanced, a nodejs framework	
// if using http hostname and port must be given but for express only port
const server = express();

// setting the view engine
server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, 'views')); 




// this is to use the middle-ware. it will be run everytime "server" runs
// order of the middle-ware is important. if this has to work it must be before the response is sent
// otherwise it wont run
server.use(logger);

// see the body parser documentation for this middle-ware
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));

// set static path, for html, css and javascript files
server.use(express.static(path.join(__dirname, 'public')));

server.get('/', (req, res) => {
	res.render('index');
});



server.listen(port, () => {
	console.log('Server started on port: ' + port);
});



/*

fs.readFile('public/new.html', (err, html) => {
	if(err) {
		console.log(err);
	}
	server.get('/', (req, res) => {
		res.render(html);
	});

	
});
*/

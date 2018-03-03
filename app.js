// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// Get our API routes
var session = require('express-session');
const app = express();
const api = require('./server/routes/api');
var utils = require("./server/libs/utils");
var websockets = require('./server/core/realtime/websockets');
var io = require('socket.io');

// Parsers for POST d
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res, next) {
    var domain = "https://localhost:3000";
    //var origin = req.header("host");
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*");

    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');

    // Set custom headers for CORS
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, viewerTZOffset");
    //res.header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Access-Token, X-Key");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});


// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

var socketServer = io.listen(server, {
    "transports": [
        "websocket",
        "flashsocket",
        "htmlfile",
        "xhr-polling",
        "jsonp-polling",
        "polling"
        ],
    "pingTimeout": 500000,
    "log level":1
});
 var sessionParameters = session({
	    secret: "mySuperPuperKey",
	    saveUninitialized: false,
	    resave: false,
	    cookie: {
	        path: "/",
	        domain: utils.isDevelopmentEnv() ? null : ".example.com",
	        httpOnly: true,
	        secure: false
	    }
	});

websockets.run(socketServer, sessionParameters);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log("Express server listening on port: %s", server.address().port));
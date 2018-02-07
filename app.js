var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var socketIO = require('socket.io');
var mysql = require('mysql');
var cors = require('cors');
var moment = require('moment');

const ENV = require('./env');
const CONST = require('./const');

var app = express();
var server = http.Server(app);
var io = socketIO(server);
var con = mysql.createConnection(ENV.con);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(__dirname + '/public'));
server.listen(ENV.port, () => console.log('Starting server on port ' + ENV.port));
app.get('/', (request, response) => response.sendFile(path.join(__dirname, '/public/index.html')));

// Routing
require('./routes/class')(app, con);
require('./routes/courses')(app, con);
require('./routes/users')(app, con);
require('./routes/students')(app, con);
require('./routes/professors')(app, con);
require('./routes/departments')(app, con);
require('./routes/chat')(app, con, io, moment);
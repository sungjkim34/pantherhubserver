var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');

var app = express();
var server = http.Server(app);
var io = socketIO(server);

app.use('/public', express.static(__dirname + '/public'));
server.listen(3004, () => console.log('Starting server on port 3004'));
app.get('/', (request, response) => response.sendFile(path.join(__dirname, '/public/index.html')));
app.get('/hello', (request, response) => response.send("helloe"));

app.get('/getAllStudents', function(req, res) {
    res.send("getAllStudents")
});

app.get('/getStudent/:studentId', function(req, res) {
    var studentId = req.params.studentId;
    res.send("getStudents by id: " + studentId);
});

app.get('/getAllProfessors', function(req, res) {
    res.send("getAllProfessors")
});

app.get('/getProfessor/:professorId', function(req, res) {
    var professorId = req.params.professorId;
    res.send("getProfessor by id: " + professorId);
});
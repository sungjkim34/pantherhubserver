var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var socketIO = require('socket.io');
var mysql = require('mysql');

var app = express();
var server = http.Server(app);
var io = socketIO(server);
var con = mysql.createConnection({
    host: 'sql9.freesqldatabase.com',
    user: 'sql9219087',
    password: 'ThGUZh1Mre',
    database: 'sql9219087',
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(__dirname + '/public'));
server.listen(3004, () => console.log('Starting server on port 3004'));
app.get('/', (request, response) => response.sendFile(path.join(__dirname, '/public/index.html')));


// Students
app.get('/getAllStudents', function(req, res) {
    var sql = 'SELECT * FROM students';
    con.query(sql, (err, result, fields) => {
        if(err) res.send(result);
        res.send(result);
    });
});

app.get('/getStudent/:studentId', function(req, res) {
    var studentId = req.params.studentId;
    var sql = 'SELECT * FROM students WHERE id = ' + studentId;
    con.query(sql, (err, result, fields) => {
        if(err) res.send(err);
        res.send(result);
    });
});

app.post('/addStudents', function(req, res) {
    var student = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dob: req.body.dob,
        major: req.body.major,
        startDate: req.body.startDate
    };
    console.log(student);
    var sql = 'INSERT INTO students (firstName, lastName, dob, major, startDate) VALUES (\'' + student.firstName + '\', \'' + student.lastName + '\', \'' + student.dob + '\', \'' + student.major + '\', \'' + student.startDate + '\')';
    con.query(sql, (err, result) => {
        if(err) res.send(err);
        res.send(result);
    });
});


//Professors
app.get('/getAllProfessors', function(req, res) {
    res.send('getAllProfessors')
    con.query('SELECT * FROM professors', (err, result, fields) => {
        if(err) throw err;
        console.log(result);
    });
});

app.get('/getProfessor/:professorId', function(req, res) {
    var professorId = req.params.professorId;
    res.send('getProfessor by id: ' + professorId);
});
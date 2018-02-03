module.exports = function(app, con){
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
}
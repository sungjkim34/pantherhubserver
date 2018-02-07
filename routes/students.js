module.exports = function(app, con){
    app.get('/getAllStudents', function(req, res) {
        var sql = 'SELECT * FROM students';
        con.query(sql, (err, result, fields) => {
            if(err) res.send(err);
            res.send(result);
        });
    });
    
    app.get('/getStudent/:studentId', function(req, res) {
        var studentId = req.params.studentId;
        var sql = 'SELECT * FROM students WHERE id = ' + studentId;
        con.query(sql, (err, result, fields) => {
            if(err) res.send(err);
            res.send(result.length ? result[0] : result);
        });
    });
    
    app.post('/addStudent', function(req, res) {
        var student = {
            firstName: req.body.firstName.charAt(0).toUpperCase() + req.body.firstName.slice(1),
            lastName: req.body.lastName.charAt(0).toUpperCase() + req.body.lastName.slice(1),
            dob: req.body.dob,
            major: req.body.major,
            startDate: req.body.startDate
        };
        var sql = 'INSERT INTO students (firstName, lastName, dob, major, startDate) VALUES (\'' + student.firstName + '\', \'' + student.lastName + '\', \'' + student.dob + '\', \'' + student.major + '\', \'' + student.startDate + '\')';
        con.query(sql, (err, result) => {
            if(err) res.send(err);
            res.send(result);
        });
    });

    app.post('/deleteStudent', function(req, res) {
        var studentId = req.body.studentId;
        var sql = 'DELETE FROM students WHERE id = ' + studentId + 'AND DELETE FROM accounts WHERE personId = ' + studentId + ' AND accountType = \'student\'';
        con.query(sql, (err, result) => {
            if(err) res.send(err);
            res.send(result);
        });
    });
}
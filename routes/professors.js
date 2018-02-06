module.exports = function(app, con){
    app.get('/getAllProfessors', function(req, res) {
        var sql = 'SELECT * FROM professors';
        con.query(sql, (err, result, fields) => {
            if(err) res.send(err);
            res.send(result);
        });
    });
    
    app.get('/getProfessor/:professorId', function(req, res) {
        var professorId = req.params.professorId;
        var sql = 'SELECT * FROM professors WHERE id = ' + professorId;
        con.query(sql, (err, result, fields) => {
            if(err) res.send(err);
            res.send(result.length ? result[0] : result);
        });
    });

    app.post('/addProfessor', function(req, res) {
        var professor = {
            firstName: req.body.firstName.charAt(0).toUpperCase() + req.body.firstName.slice(1),
            lastName: req.body.lastName.charAt(0).toUpperCase() + req.body.lastName.slice(1),
            dob: req.body.dob,
            departmentId: req.body.departmentId
        };
        var sql = 'INSERT INTO professors (firstName, lastName, dob, departmentId) VALUES (\'' + professor.firstName + '\', \'' + professor.lastName + '\')';
        con.query(sql, (err, result) => {
            if(err) res.send(err);
            res.send(result);
        });
    });
}
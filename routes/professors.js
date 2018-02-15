module.exports = function(app, con, logger){
    app.get('/getAllProfessors', function(req, res) {
        var sql = 'SELECT * FROM professors';
        con.query(sql, (err, result, fields) => {
            if (err) {
                logger.debug(err);
                res.send(err);
            }
            res.send(result);
        });
    });
    
    app.get('/getProfessor/:professorId', function(req, res) {
        var professorId = req.params.professorId;
        var sql = 'SELECT * FROM professors WHERE id = ' + professorId;
        con.query(sql, (err, result, fields) => {
            if (err) {
                logger.debug(err);
                res.send(err);
            }
            res.send(result && result.length ? result[0] : result);
        });
    });

    app.post('/addProfessor', function(req, res) {
        var professor = {
            firstName: req.body.firstName.charAt(0).toUpperCase() + req.body.firstName.slice(1),
            lastName: req.body.lastName.charAt(0).toUpperCase() + req.body.lastName.slice(1),
            dob: req.body.dob,
            departmentId: req.body.departmentId
        };
        var sql = 'INSERT INTO professors (firstName, lastName, dob, departmentId) VALUES (\'' + professor.firstName + '\', \'' + professor.lastName + '\', \'' + professor.dob + '\', \'' + professor.departmentId+ '\')';
        con.query(sql, (err, result) => {
            if (err) {
                logger.debug(err);
                res.send(err);
            }
            res.send(result);
        });
    });

    app.post('/deleteProfessor', function(req, res) {
        var professorId = req.body.professorId;
        var sql = 'DELETE FROM professors WHERE id = ' + professorId;
        con.query(sql, (err, result) => {
            // TODO: JOIN SQL QUERIES INTO ONE
            var sql2 = 'DELETE FROM accounts WHERE personId = ' + professorId + ' AND accountType = \'professor\'';
            con.query(sql2, (err, result) => {
                if (err) {
                    logger.debug(err);
                    res.send(err);
                }
                res.send(result);
            });
            // if(err) res.send(err);
            // res.send(result);
        });
    });
}
module.exports = function(app, con, logger){

    app.get('/getAllDepartments', function(req, res) {
        var sql = 'SELECT * FROM departments';
        con.query(sql, (err, result, fields) => {
            if (err) {
                logger.debug(err);
                res.send(err);
            }
            res.send(result);
        });
    });

    app.post('/addDepartment', function(req, res) {
        var departmentName = req.body.departmentName;
        var sql = 'INSERT INTO departments (name) VALUES (\'' + departmentName + '\')';
        con.query(sql, (err, result) => {
            if (err) {
                logger.debug(err);
                res.send(err);
            }
            res.send(result);
        });
    });

}
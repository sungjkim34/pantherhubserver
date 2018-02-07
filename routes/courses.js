module.exports = function(app, con){

    app.get('/getAllCourses', function(req, res) {
        var sql = 'SELECT * FROM courses';
        con.query(sql, (err, result, fields) => {
            if(err) res.send(err);
            res.send(result);
        });
    });

    app.post('/addCourse', function(req, res) {
        var courseInfo = {
            name: req.body.name,
            departmentId: req.body.departmentId,
            credits: req.body.credits,
            subject: req.body.subject
        }
        var sql = 'INSERT INTO courses (name, departmentId, credits, subject) VALUES (\'' + courseInfo.name + '\', \'' + courseInfo.departmentId + '\', \'' + courseInfo.credits + '\', \'' + courseInfo.subject + '\')';
        con.query(sql, (err, result) => {
            if(err) res.send(err);
            res.send(result);
        });
    });

    app.post('/deleteCourse', function(req, res) {
        var courseId = req.body.courseId;
        var sql = 'DELETE FROM courses WHERE id = ' + courseId;
        con.query(sql, (err, result) => {
            if(err) res.send(err);
            res.send(result);
        });
    });
}
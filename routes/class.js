module.exports = function(app, con, logger){

    app.get('/getAllClasses', function(req, res) {
        var sql = 'SELECT * FROM classes';
        con.query(sql, (err, result, fields) => {
            if (err) {
                logger.debug(err);
                res.send(err);
            }
            res.send(result);
        });
    });

    app.get('/getAllClassesDetailed', function(req, res) {
        var sql = 'SELECT class.id as id, courseId, professorId, startTime, endTime, classDays, maxStudents, location, firstName, lastName, dob, course.departmentId, name, credits, subject FROM classes AS class INNER JOIN professors AS professor ON class.professorId = professor.Id INNER JOIN courses AS course ON class.courseId = course.id';
        con.query(sql, (err, result, fields) => {
            if (err) {
                logger.debug(err);
                res.send(err);
            }
            res.send(result);
        });
    });

    app.get('/getClassesTaughtByProfessor/:professorId', function(req, res) {
        var professorId = req.params.professorId;
        var sql = 'SELECT courseId, professorId, startTime, endTime, classDays, maxStudents, location, classes.id as classId, professors.id as professorId, firstName, lastName, dob, departmentId FROM classes INNER JOIN professors ON classes.professorId = professors.id WHERE professorId = ' + professorId;
        con.query(sql, (err, result, fields) => {
            if (err) {
                logger.debug(err);
                res.send(err);
            }
            res.send(result);
        });
    });

    app.get('/getStudentsEnrolledInClass/:classId', function(req, res) {
        var classId = req.params.classId;
        var sql = 'SELECT * FROM enrollments INNER JOIN students ON students.id = enrollments.studentId WHERE classId = ' + classId;
        con.query(sql, (err, result, fields) => {
            if (err) {
                logger.debug(err);
                res.send(err);
            }
            res.send(result);
        });
    });

    app.post('/addClass', function(req, res) {
        var classInfo = {
            courseId: req.body.courseId,
            professorId: req.body.professorId,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            classDays: JSON.stringify(req.body.classDays),
            maxStudents: req.body.maxStudents,
            location: req.body.location
        }
        var sql = 'INSERT INTO classes (courseId, professorId, startTime, endTime, classDays, maxStudents, location) VALUES (\'' + classInfo.courseId + '\', \'' + classInfo.professorId + '\', \'' + classInfo.startTime + '\', \'' + classInfo.endTime + '\', \'' + classInfo.classDays + '\', \'' + classInfo.maxStudents + '\', \'' + classInfo.location + '\')';
        con.query(sql, (err, result) => {
            if (err) {
                logger.debug(err);
                res.send(err);
            }
            res.send(result);
        });
    });

    app.post('/deleteClass', function(req, res) {
        var classId = req.body.classId;
        var sql = 'DELETE FROM classes WHERE id = ' + classId;
        con.query(sql, (err, result) => {
            if (err) {
                logger.debug(err);
                res.send(err);
            }
            res.send(result);
        });
    });
}
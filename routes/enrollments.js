module.exports = function(app, con, moment, logger){

    app.get('/getAllEnrollments', function(req, res) {
        var sql = 'SELECT * FROM enrollments';
        con.query(sql, (err, result, fields) => {
            if (err) {
                logger.debug(err);
                res.send(err);
            }
            res.send(result);
        });
    });

    // app.get('/getAllClassesDetailed', function(req, res) {
    //     var sql = 'SELECT * FROM classes AS class INNER JOIN professors AS professor ON class.professorId = professor.Id INNER JOIN courses AS course ON class.courseId = course.id';
    //     con.query(sql, (err, result, fields) => {
    //         if(err) res.send(err);
    //         res.send(result);
    //     });
    // });

    app.get('/getStudentEnrollment/:studentId', function(req, res) {
        var studentId = req.params.studentId;
        // var sql = 'SELECT * FROM enrollments WHERE studentId = ' + studentId;
        const sql = 'SELECT enrollment.id as id, studentId, classId, enrollmentDate, courseId, professorId, firstName as professorFirstName, lastName as professorLastName, startTime, endTime, classDays, maxStudents, location, name, course.departmentId, credits, subject FROM enrollments as enrollment INNER JOIN classes as class ON enrollment.classId = class.id INNER JOIN courses as course on class.courseId = course.id INNER JOIN professors as professor on class.professorId = professor.id WHERE studentId = ' + studentId;
        con.query(sql, (err, result, fields) => {
            if (err) {
                logger.debug(err);
                res.send(err);
            }
            res.send(result);
        });
    });

    app.post('/registerClass', function(req, res) {
        var studentId = req.body.studentId;
        var classId = req.body.classId;
        var enrollmentDate = moment().format("YYYY-MM-DD HH:mm:ss");
        var sql = 'INSERT INTO enrollments (studentId, classId, enrollmentDate) VALUES (\'' + studentId + '\', \'' + classId + '\', \'' + enrollmentDate + '\')';
        con.query(sql, (err, result) => {
            if (err) {
                logger.debug(err);
                res.send(err);
            }
            res.send(result);
        });
    });

    app.post('/dropClass', function(req, res) {
        var enrollmentId = req.body.enrollmentId;
        var sql = 'DELETE FROM enrollments WHERE id = ' + enrollmentId;
        con.query(sql, (err, result) => {
            if (err) {
                logger.debug(err);
                res.send(err);
            }
            res.send(result);
        });
    });
}
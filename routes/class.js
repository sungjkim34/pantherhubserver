module.exports = function(app, con){

    app.get('/getAllClasses', function(req, res) {
        var sql = 'SELECT * FROM classes';
        con.query(sql, (err, result, fields) => {
            if(err) res.send(err);
            res.send(result);
        });
    });

    app.get('/getAllClassesDetailed', function(req, res) {
        var sql = 'SELECT class.id as id, courseId, professorId, startTime, endTime, classDays, maxStudents, location, firstName, lastName, dob, course.departmentId, name, credits, subject FROM classes AS class INNER JOIN professors AS professor ON class.professorId = professor.Id INNER JOIN courses AS course ON class.courseId = course.id';
        con.query(sql, (err, result, fields) => {
            if(err) res.send(err);
            res.send(result);
        });
    });

//     Select * 
// from customers AS cust
// INNER JOIN companies AS comp ON cust.Company = comp.Id
// where comp.location like '%$term%' 
//    or comp.company like '%$term%'

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
            if(err) res.send(err);
            res.send(result);
        });
    });

    app.post('/deleteClass', function(req, res) {
        var classId = req.body.classId;
        var sql = 'DELETE FROM classes WHERE id = ' + classId;
        con.query(sql, (err, result) => {
            if(err) res.send(err);
            res.send(result);
        });
    });
}
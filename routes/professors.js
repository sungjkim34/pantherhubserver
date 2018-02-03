module.exports = function(app, con){
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
}
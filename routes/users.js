module.exports = function(app, con){
    app.post('/authUser', function(req, res) {
        var username = req.body.username;
        var password = req.body.password;
        console.log(req.body);
        var sql = 'SELECT accountType FROM accounts WHERE username = \'' + username + '\' AND password = \'' + password + '\'';
        con.query(sql, (err, result) => {
            if(err) res.send(err);
            res.send(result);
        });
    });
    
    app.post('/registerUser', function(req, res) {
        var user = {
            username: req.body.username,
            password: req.body.password,
            accountType: req.body.accountType,
            personId: req.body.personId
        }
        var sql = 'INSERT INTO accounts (username, password, accountType, personId) VALUES (\'' + user.username + '\', \'' + user.password + '\', \'' + user.accountType + '\', \'' + user.personId + '\')';
        con.query(sql, (err, result) => {
            if(err) res.send(err);
            res.send(result);
        });
    });
}
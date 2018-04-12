module.exports = function(app, con, logger){
    app.post('/authUser', function(req, res) {
        var username = req.body.username;
        var password = req.body.password;
        if(!(/^[a-zA-Z0-9- ]*$/.test(username)) || !(/^[a-zA-Z0-9- ]*$/.test(password))) {
            console.log('aweiofj');
            res.send([]);
        } else {
            var sql = 'SELECT personId, accountType FROM accounts WHERE username = \'' + username + '\' AND password = \'' + password + '\'';
            con.query(sql, (err, result) => {
                if (err) {
                    logger.debug(err);
                    res.send(err);
                }
                res.send(result && result.length ? result[0] : result);
            });
        }
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
            if (err) {
                logger.debug(err);
                res.send(err);
            }
            res.send(result);
        });
    });

    app.get('/checkUsername/:username', function(req, res) {
        var username = req.params.username;
        var sql = 'SELECT * FROM accounts WHERE username = \'' + username + '\'';
        con.query(sql, (err, result, fields) => {
            if (err) {
                logger.debug(err);
                res.send(err);
            }
            res.send(!!result.length);
        });
    });

    app.post('/deleteAccount', function(req, res) {
        var accountId = req.body.accountId;
        var sql = 'DELETE FROM accounts WHERE id = ' + accountId;
        con.query(sql, (err, result) => {
            if (err) {
                logger.debug(err);
                res.send(err);
            }
            res.send(result);
        });
    });

    app.get('/getAllAccounts', function(req, res) {
        var username = req.params.username;
        var sql = 'SELECT * FROM accounts';
        con.query(sql, (err, result, fields) => {
            if (err) {
                logger.debug(err);
                res.send(err);
            }
            res.send(result);
        });
    });
}
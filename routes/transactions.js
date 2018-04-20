module.exports = function(app, con, logger){
    
    app.get('/getStudentTransactions/:studentId', function(req, res) {
        var studentId = req.params.studentId;
        var sql = 'SELECT student.id, firstName, lastName, dob, major, startDate, transaction.id AS transactionID, amountPaid FROM students AS student INNER JOIN transactions AS transaction ON student.id = transaction.studentId WHERE studentId=' + studentId;
        con.query(sql, (err, result, fields) => {
            if (err) {
                logger.debug(err);
                res.send(err);
            }
            res.send(result && result.length && result);
        });
    });

    app.get('/getTotalStudentTransaction/:studentId', function(req, res) {
        var studentId = req.params.studentId;
        var sql = 'SELECT student.id, firstName, lastName, dob, major, startDate, SUM(amountPaid) as totalPaid FROM students AS student INNER JOIN transactions AS transaction ON student.id = transaction.studentId WHERE studentId=' + studentId + ' GROUP BY studentId';
        con.query(sql, (err, result, fields) => {
            if (err) {
                logger.debug(err);
                res.send(err);
            }
            res.send(result && result.length ? result[0] : {});
        });
    });
    
    app.post('/addTransaction', function(req, res) {
        var transaction = {
            studentId: req.body.studentId,
            amountPaid: req.body.amountPaid
        };
        var sql = 'INSERT INTO transactions (studentId, amountPaid) VALUES (\'' + transaction.studentId + '\', \'' + transaction.amountPaid + '\')';
        con.query(sql, (err, result) => {
            if (err) {
                logger.debug(err);
                res.send(err);
            }
            res.send(result);
        });
    });

    app.post('/deleteTransaction', function(req, res) {
        var transactionId = req.body.transactionId;
        var sql = 'DELETE FROM transactions WHERE id = ' + transactionId;
        con.query(sql, (err, result) => {
            if (err) {
                logger.debug(err);
                res.send(err);
            }
            res.send(result);
        });
    });
}
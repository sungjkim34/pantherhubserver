module.exports = function(app, con, io, moment){
    app.get('/getAllChats', function(req, res) {
        var sql = 'SELECT * FROM chats';
        con.query(sql, (err, result, fields) => {
            if(err) res.send(err);
            res.send(result);
        });
    });

    //TODO
    app.get('/deleteMessage/:messageId', function(req, res) {
        var messageId = req.params.messageId;
        var sql = 'DELETE FROM chats WHERE id = ' + messageId;
        con.query(sql, (err, result, fields) => {
            if(err) res.send(err);
            res.send(result);
        });
    });

    io.on('connection', socket => {
        socket.on('sendMessage', message => {
            const { messageText, authorId, authorType, authorFirstName, authorLastName } = message;
            const messageDate = moment(message.messageDate).format('YYYY-MM-DD HH:mm:ss');
            var sql = 'INSERT INTO chats (messageText, messageDate, authorId, authorType, authorFirstName, authorLastName) VALUES (\'' + messageText + '\', \'' + messageDate + '\', \'' + authorId + '\', \'' + authorType + '\', \'' + authorFirstName + '\', \'' + authorLastName + '\')';
            con.query(sql, (err, result) => {
                if(err) console.log(err);
                message.messageDate = messageDate;
                message.id = result.insertId;
                const sendMessage = Object.assign({}, {socketId: socket.id, message});
                io.sockets.emit('sendMessage', sendMessage);
            });
        });
    });
}
/**
 * Created by EtaySchur on 10/04/2016.
 */

var express   = require('express');
var app      = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    app.use("/styles", express.static(__dirname + '/styles'));
    app.use("/scripts", express.static(__dirname + '/scripts'));
    app.use("/partials", express.static(__dirname + '/partials'));

    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){



    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on('update-data', function(gameData){
        io.emit('update-data', gameData );
    });

    socket.on('user-logged-in', function(userData){
        console.log(" USER LOGGED IN ! ",userData);
        io.emit('user-logged-in', userData );
    });



});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
/**
 * Created by EtaySchur on 10/04/2016.
 */

var express   = require('express');
var app      = express();
var http = require('http').Server(app);

app.get('/', function(req, res){
    console.log("Sending File ? " , __dirname);
    app.use("/styles", express.static(__dirname + '/styles'));
    app.use("/scripts", express.static(__dirname + '/scripts'));
    app.use("/partials", express.static(__dirname + '/partials'));

    res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
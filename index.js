/**
 * Created by EtaySchur on 10/04/2016.
 */

var app = require('express')();
var http = require('http').Server(app);

app.get('/', function(req, res){
    console.log("Sending File ?");
    res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
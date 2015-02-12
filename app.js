'use strict';

var http = require('http'),
    express = require('express'),
    mongoose = require('mongoose'),
    path = require('path'),
    mc = require('my-config').init(path.resolve(__dirname , './config.json')),
    app = express(),
    server;

//global settings
app.set('port' , mc.server.port);
app.set('ip' , mc.server.ip);

app.get('/' , function(req , res) {
	res.json({ hello : 'world' });
});

//create http server with all express options
server = http.createServer(app);
//connect to mongodb instance before make server listen
mongoose.connect('mongodb://' + mc.database.user + ':' 
                              + mc.database.password + '@' 
                              + mc.database.host + ':' 
                              + mc.database.port + '/' 
                              + mc.database.db , function(err) {
  if (err) throw { 
		name : 'DB Connection Error',
		message : 'Unable to connect to DB: ' + err };
	server.listen(app.get('port') , app.get('ip') , function(err) {
		if (err) throw {
			name : 'Listen Server Error',
			message : 'Unable to make server listen: ' + err
		};
		console.log('Server listening on ' + app.get('ip') + ':' + app.get('port'));
	});
});

module.exports = server;
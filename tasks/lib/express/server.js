'use strict';

// sample express server configuration
var http = require('http'),
    express = require('express'),
    app = express(),
    server = http.createServer(app),
    nopt = require('nopt');

var options = nopt({
    hostname: String,
    port: Number,
    baseURL: String
},{
    port: ['--port'],
    hostname: ['--hostname'],
    baseURL: ['--baseurl']
}, process.argv, 2);

var port = options.port || 3000,
    hostname = options.hostname || 'localhost',
    baseURL = options.baseURL || '/';

app.set('port', port);
app.use(express.favicon());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.errorHandler());
app.use(express.logger('dev'));

app.get(baseURL, function (req, res){
    res.send('grunt-express is running successfully');
});

server.listen(port, hostname, function () {
    console.log('Express server started on port ' + port);
});

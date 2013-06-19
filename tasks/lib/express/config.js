'use strict';

var path = require('path'),
    express = require('express');

exports.common = function (app, server, options) {
    app.set('port', options.port);
    app.use(express.favicon());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.errorHandler());

    app.use('/', express.static(path.resolve('.tmp')));
    app.use('/', express.static(path.resolve('app')));

    app.use(express.directory(options.basePath));
};

exports.development = function (app, server, options) {
    app.use(express.logger('dev'));
};

exports.production = function (app, server, options) {

};

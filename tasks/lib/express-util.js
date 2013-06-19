'use strict';

var http = require('http'),
    express = require('express'),
    _ = require('underscore');

exports.init = function (options, grunt) {

    var exports = {};

    exports.app = express();
    exports.server = http.createServer(exports.app);

    exports.loadExpressConfig = function (configPath, environment) {
        if (require(configPath)[environment]) {
            require(configPath)[environment](exports.app, exports.server, options);
            grunt.log.ok('Express ' + environment + ' config loaded.');
        } else {
            grunt.log.error('Missing Express config for ' + environment + '.');
        }
    };

    exports.loadExpressRoutes = function (routesPath) {
        var routes = require(routesPath).routes(options.baseURL) || {};
        // itterate through each list of routes by method (verb)
        _.each(routes, function (list, verb) {
            // assign url route handler to route
            _.each(list, function (handler, route) {
                route = (route.indexOf('/') === 0) ? route.substring(1) : route;
                exports.app[verb](options.baseURL + route, handler);
            });
        });
    };

    exports.startExpress = function (cb) {
        exports.server.listen(options.port, options.hostname, function () {
            grunt.log.ok('Express server started on port ' + options.port);
            if (typeof cb === 'function') {
                cb();
            }
        });
    };

    exports.stopExpress = function () {
        exports.server.close();
        grunt.log.ok('Express server stoped on port ' + options.port);
    };

    return exports;

};

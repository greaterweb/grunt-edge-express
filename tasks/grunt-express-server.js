'use strict';

var path = require('path'),
    fs = require('fs'),
    util = require('util'),
    _ = require('underscore'),
    inspect = function (obj) {
        return util.inspect(obj, false, 4, true);
    };

module.exports = function (grunt) {

    var portsInUse = [],
        servers = [];

    grunt.registerMultiTask('express', 'Start an express web server.', function () {
        var done = this.async(),
            environment = (this.flags.production)?'production':'development',
            options = this.options({
                hostname: 'localhost',
                port: 3000,
                baseURL: '/',
                basePath: path.resolve('app'),
                configPath: path.resolve('express/config.js'),
                routesPath: path.resolve('express/routes.js'),
                environment: environment
            }),
            targetName = this.target,
            keepalive = this.flags.keepalive || false,
            expressUtil = require('./lib/express-util.js').init(options, grunt);

        // check to see if port is in use, if so increment to find an available one
        if (~portsInUse.indexOf(options.port)) {
            grunt.log.error('Port ' + options.port + ' already in use');
            while (~portsInUse.indexOf(options.port)) {
                options.port++;
            }
            grunt.log.ok('Port conflict resolved, incremented to ' + options.port);
        }
        portsInUse.push(options.port);
        grunt.verbose.subhead('Options for ' + targetName + ':').writeln(inspect(options));

        if (!fs.existsSync(options.configPath)) {
            grunt.log.error('Config for express missing at ' + options.configPath);
            options.configPath = path.resolve(__dirname + '/lib/express/config.js');
            grunt.log.ok('Missing express config resolved, default used at ' + options.configPath);
        }
        expressUtil.loadExpressConfig(options.configPath, 'common');
        expressUtil.loadExpressConfig(options.configPath, options.environment);

        if (!fs.existsSync(options.routesPath)) {
            grunt.log.error('Routes for express missing at ' + options.routesPath);
            options.routesPath = path.resolve(__dirname + '/lib/express/routes.js');
            grunt.log.ok('Missing express routes resolved, default used at ' + options.routesPath);
        }

        expressUtil.loadExpressRoutes(options.routesPath);
        expressUtil.startExpress(function () {
            servers.push([targetName, expressUtil]);
            if (!keepalive) {
                done();
            } else {
                grunt.log.subhead('Keeping alive for express...\n');
            }
        });
    });

    grunt.registerTask('express:stop', 'Stop all running express servers', function() {
        _.each(servers, function (server) {
            grunt.log.ok('Attempting to stop Express server for: ' + server[0]);
            if (typeof server[1].stopExpress === 'function') {
                server[1].stopExpress();
            } else {
                grunt.log.error('Unable to stop express server for ' + server[0]);
            }
        });
    });

    grunt.registerTask('express:keepalive', 'Keep express running', function() {
        this.async();
        grunt.log.subhead('Keeping alive for express...\n');
    });

};

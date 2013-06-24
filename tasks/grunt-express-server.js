'use strict';

var path = require('path'),
    fs = require('fs'),
    forever = require('forever-monitor'),
    util = require('util'),
    inspect = function (obj) {
        return util.inspect(obj, false, 4, true);
    };

module.exports = function (grunt) {

    var portsInUse = [],
        servers = [];

    grunt.registerMultiTask('express', 'Start an express web server.', function () {
        var done = this.async(),
            options = this.options({
                hostname: 'localhost',
                port: 3000,
                baseURL: '/',
                configPath: path.resolve('express/server.js'),
                debug: true
            }),
            targetName = this.target;

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
            options.configPath = path.resolve(__dirname + '/lib/express/server.js');
            grunt.log.ok('Missing express config resolved, default used at ' + options.configPath);
        }

        var server = new (forever.Monitor)(options.configPath, {
            max: 3,
            silent: true,
            options: ['--port=' + options.port, '--hostname=' + options.hostname, '--baseurl=' + options.baseURL]
        });

        server.on('start', function () {
            done();
        });

        if (options.debug) {
            server.on('stdout', function (msg) {
                grunt.log.write(targetName + ' >>', msg.toString());
            });
        }

        server.start();

        servers.push([targetName, server]);

        // make sure all server are taken down when grunt exits.
        process.on('exit', function() {
            if (server.running) {
                server.stop();
            }
        });

    });

    grunt.registerTask('express:restart', 'Stop all running express servers', function(target) {
        if (!servers.length) {
            grunt.log.error('Nothing to restart, no Express servers are running');
        } else {
            grunt.util._(servers).forEach(function (server) {
                if (!target || target === server[0]) {
                    grunt.log.ok('Attempting to restart Express server for: ' + server[0]);
                    if (server[1].running) {
                        server[1].restart();
                    }
                }
            });
        }
    });

    grunt.registerTask('express:stop', 'Stop all running express servers', function(target) {
        if (!servers.length) {
            grunt.log.error('Nothing to stop, no Express servers are running');
        } else {
            grunt.util._(servers).forEach(function (server) {
                if (!target || target === server[0]) {
                    grunt.log.ok('Attempting to stop Express server for: ' + server[0]);
                    if (server[1].running) {
                        server[1].stop();
                    }
                }
            });
        }
    });

    grunt.registerTask('express:keepalive', 'Keep express running', function() {
        this.async();
        grunt.log.subhead('Keeping alive for express...\n');
    });

};

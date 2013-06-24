'use strict';

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    grunt.loadTasks('tasks'); // these tasks

    grunt.initConfig({

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            grunt: 'Gruntfile.js',
            server: [
                'tasks/**/*.js',
                '!tasks/lib/express/*.js'
            ]
        },
        express: {
            server: {

            }
        }
    });

};

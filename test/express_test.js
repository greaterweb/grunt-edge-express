'use strict';

var grunt = require('grunt'),
    http = require('http'),
    Q = require('q');

function getPage(url) {
    var deferred = Q.defer();
    try {
        var req = http.get(url, function (res) {
            var response = '';

            res.on('data', function (chunk) {
                response += chunk;
            });

            res.on('end', function () {
                deferred.resolve({
                    res: res,
                    body: response
                });
            });

        });

        req.on('error', function (event) {
            deferred.reject(event);
        });

        req.end();
    } catch (error) {
        deferred.reject(error);
    }
    return deferred.promise;
}

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.express = {
    setUp: function(done) {
        // setup here if necessary
        // setTimeout(function() {
            done();
        // }, 500);
    },
    default_options: function(test) {
        test.expect(2);
        getPage('http://localhost:3000').then(function (response) {
            test.equal(response.res.statusCode, 200, 'should return 200 code');
            test.equal(response.body, 'grunt-express is running successfully', 'body should match server response');
            test.done();
        }, function (error) {
            test.done();
        });
    },
    custom_options: function(test) {
        test.expect(2);
        getPage('http://localhost:9000/plugin/').then(function (response) {
            test.equal(response.res.statusCode, 200, 'should return 200 code');
            test.equal(response.body, 'grunt-express is running successfully', 'body should match server response');
            test.done();
        }, function (error) {
            test.done();
        });
    }
};

'use strict';

exports.routes = function (baseUrl) {

    return {
        'get': {
            '/get-sample': function (req, res, next) {
                res.send('You have reached get-sample!');
            }
        },
        'post': {
            '/post-sample': function (req, res, next) {
                res.send('You have reached post-sample!');
            }
        }
    };
};

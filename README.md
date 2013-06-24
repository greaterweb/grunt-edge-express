# grunt-edge-express

> A Grunt task to luanch an Express server for project testing

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-edge-express --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-edge-express');
```

## The "express" task

### Overview
In your project's Gruntfile, add a section named `express` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  express: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.port
Type: `Integer`
Default value: `3000`

The port on which the express server will respond. The task will fail if the specified port is already in use. You can use the special values 0 or '?' to use a system-assigned port.

#### options.hostname
Type: `String`
Default value: `'localhost'`

The hostname the express server will use.

#### options.baseURL
Type: `String`
Default value: `'/'`

String appended to the end of the `hostname:port` URL, must start with a leading slash.

#### options.configPath

Type: `String` 
Default: `path.resolve('express/server.js')`

Location of the `server.js` file used to include project specific express configuration rules.

#### options.debug

Type: `Boolean` 
Default: `true`

Flag to determine if `stdout` of server process will be displayed.

#### IMPORTANT: Option Usage in Express Configuration
Please note that `port`, `hostname`, and `baseURL` are passed as options to your server configuration file defined at `configPath`. Failing to provide option parsing and implementing injection of these options into your server configuration may result in issues or errors with your Express server. 

It is recommended using modules such as [nopt](https://github.com/isaacs/nopt) for option parsing within your server configuration file.

```js
// include the nopt module
var nopt = require('nopt');

// get options based on a specific configuration
// plase see https://github.com/isaacs/nopt for
// additional usage examples
var options = nopt({
    hostname: String,
    port: Number,
    baseURL: String
},{
    port: ['--port'],
    hostname: ['--hostname'],
    baseURL: ['--baseurl']
}, process.argv, 2);

// supply default values if option values are not present
var port = options.port || 3000,
    hostname = options.hostname || 'localhost',
    baseURL = options.baseURL || '/';
...
// use in your server configuraiton
server.listen(port, hostname, function () {
    console.log('Express server started on port ' + port);
});
```

### Usage Examples

#### Default Options
In this example, an Express server instance will be setup based on the default configuraiton parameters.

```js
grunt.initConfig({
    express: {
        server: {}
    }
})
```

#### Custom Options
In this example, custom options are used to configure the Express server with port `9000` and a base url of `/plugin`. This produces a destination of `http://localhost:9000/plugin`.

```js
grunt.initConfig({
    express: {
        server: {
            port: 9000,
            baseURL: '/plugin'
        }
    }
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

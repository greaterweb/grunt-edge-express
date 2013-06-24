## Grunt Express Server

Grunt task to start express server for project.

### Grunt Tasks

    grunt express

Task to start all configured express servers.

    grunt express:restart

Task to restart all configured express servers.

    grunt express:restart:target_name

Task to restart a specifc target express server.

    grunt express:stop

Task to stop all configured express servers.

    grunt express:stop:target_name

Task to stop specific target express server.

### Grunt Config

#### hostname

Type: `String` Default: `localhost`

The hostname the express server will use.

#### port

Type: `Integer` Default: `3000`

The port on which the express server will respond. The task will fail if the specified port is already in use.

#### baseURL

Type: `String` Default: `/`

String appended to the end of the `hostname:port` URL.

#### configPath

Type: `String` Default: `path.resolve('express/server.js')`

Location of the `server.js` file used to include project specific express configuration rules.

#### debug

Type: `Boolean` Default: `true`

Flag to determine if `stdout` of server process will be displayed.

#### port

Type: `Integer` Default: `3000`

The port on which the express server will respond. The task will fail if the specified port is already in use.

## Contributing to Project

In order to contribute to this project it is expected that you have `node`, `npm` and `grunt-cli` installed on your machine.

All other project dependencies are outlined in the package.json file.

### Getting Started

    git clone https://github.com/greaterweb/grunt-express.git

After you have cloned the repository from the project root run

    npm install

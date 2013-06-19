## Grunt Express Server

Grunt task to start express server for project.

### Grunt Tasks

    grunt express

Task to start all configured express projects.

    grunt express:stop

Task to stop all configured express projets.

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

#### basePath

Type: `String` Default: `path.resolve('app')`

The base (or root) directory from which files will be served. Defaults to the `app` directory. 

#### configPath

Type: `String` Default: `path.resolve('express/config.js')`

Location of the `config.js` file used to include project specific express configuration rules.

#### environment

Type: `String` Default: `development`

Configuration environment to use when starting express server.

#### routesPath

Type: `String` Default: `path.resolve('express/routes.js')`

Location of the `routes.js` file used to include project specific express routing rules.

## Contributing to Project

In order to contribute to this project it is expected that you have `node`, `npm` and `grunt-cli` installed on your machine.

All other project dependencies are outlined in the package.json file.

### Getting Started

    git clone https://github.com/greaterweb/grunt-express.git

After you have cloned the repository from the project root run

    npm install

# Referal Program Backend

> Express REST API with JWT Authentication and support for MySQL and PostgreSQL

- Compilation via [Babel](https://babeljs.io/)
- Authentication via [JWT](https://jwt.io/)
- Routes mapping via [express-routes-mapper](https://github.com/aichbauer/express-routes-mapper)
- Environments for `development`, `testing`, and `production`
- Check the example for User model and User controller, with JWT authentication - [installation instructions](#install-and-use).

## Table of Contents

- [Install & Use](#install-and-use)
- [Folder Structure](#folder-structure)
- [Config](#config)
  - [Connection and Database](#connection-and-database)

## Install and Use

Start by cloning this repository

```sh
# HTTPS
$ git clone https://github.com/MarkKhramko/nodejs-express-jwt
```

then use [npm](https://www.npmjs.com/) to

```sh
# cd into project root
$ npm install
# copy environment file 
$ cp .env.example .env
# fill .env file
# ...
# start the application (without code watcher)
$ npm start
#
# OR
#
# start development with nodemon
$ npm run dev
```

## Folder Structure

This boilerplate has 4 main directories:

- app - for controllers, models, services, etc.
- config - for routes, database, etc.
- public - for css, js, favicon files, etc.
- migrator - snippet to help migrate required models before application start.

## Config

Holds all the server configurations.

## Connection and Database

Configure the keys with your credentials in `.env` file.

```
  DB_DIALECT=mysql
  DB_HOST=localhost
  DB_NAME=name
  DB_USER=root
  DB_PASSWORD=root
  DB_PORT=3609
```

Default dialect for the application is MySQL. To switch for PostgreSQL, type `DB_DIALECT=postgres` in `.env` file.

### npm run dev

This is the entry for a developer. This command:

- runs **nodemon watch task** for the all files conected to `.app/app.js`, except `./public` directory
- Reads **environment variable** `NODE_ENV` from `.env`
- Opens the db connection for `development`
- Starts the server on 127.0.0.1:APP_PORT

## npm run production

This command:

- Sets the **environment variable** to `production`
- Opens the db connection for `production`
- Starts the server on 127.0.0.1:APP_PORT

Before running on production you have to set the **environment vaiables**:

- APP_PORT - Port for your application (usually `80`).
- DB_DIALECT - `mysql` or `postgres`
- DB_HOST - Host address of your database
- DB_NAME - Database name for production
- DB_USER - Database username for production
- DB_PASS - Database password for production
- DB_PORT - Database port for production
- JWT_SECERT - Secret for JSON web token (Make sure it is different from your local environment)

### Other commands

- `npm start` - Simply start the server without a watcher;

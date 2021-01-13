const pg = require('pg');
const connection = require('./connection');

let pgClient;
let connectionString = ''

switch (process.env.NODE_ENV) {
	case 'production':
		connectionString = `postgres://${connection.production.username}:${connection.production.password}@${connection.production.host}/${connection.production.database}`;
		pgClient = new pg.Client(connectionString);
		break;
	case 'testing':
		connectionString = `postgres://${connection.testing.username}:${connection.testing.password}@${connection.testing.host}/${connection.testing.database}`;
		pgClient = new pg.Client(connectionString);
		break;
	default:
		connectionString = `postgres://${connection.development.username}:${connection.development.password}@${connection.development.host}/${connection.development.database}`;
		pgClient = new pg.Client(connectionString);
}

module.exports = pgClient;
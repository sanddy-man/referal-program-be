const Sequelize = require('sequelize');

const sequelize = require('../../config/database');

const hooks = {
	beforeCreate(invite) {},
};

const tableName = 'invites';

const Invite = sequelize.define('Invite', {
	userId: {
		type: Sequelize.STRING,
	},
	email: {
		type: Sequelize.STRING,
	},
	registered: {
		type: Sequelize.BOOLEAN,
	},
	referalCode: {
		type: Sequelize.STRING,
		unique: true,
	},
}, { hooks, tableName });


Invite.prototype.toJSON = function () {
	const values = Object.assign({}, this.get());
	return values;
};

module.exports = Invite;
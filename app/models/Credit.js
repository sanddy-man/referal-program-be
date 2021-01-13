const Sequelize = require('sequelize');

const sequelize = require('../../config/database');

const hooks = {
	beforeCreate(credit) {},
};

const tableName = 'credits';

const Credit = sequelize.define('Credit', {
	userId: {
        type: Sequelize.STRING,
        unique: true,
	},
	value: {
		type: Sequelize.INTEGER,
	},
}, { hooks, tableName });


Credit.prototype.toJSON = function () {
	const values = Object.assign({}, this.get());
	return values;
};

module.exports = Credit;
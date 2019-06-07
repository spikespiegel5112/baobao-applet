const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../util/database');

const User = sequelize.define('user', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	userId: Sequelize.STRING,
	userName: Sequelize.STRING,
	cellphone: Sequelize.INTEGER,
	password: Sequelize.STRING
});

module.exports = User;

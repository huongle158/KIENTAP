const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	userCreateDay: Date,
	username: String,
	email: String,
	password: String,
	phone: String,
	address: String,
	avt: String,
	tinh: String,
	huyen: String,
	admin: { type: Boolean, default: false }
},

	{
		versionKey: false
	}
)

var User = mongoose.model('User', userSchema, 'user');

module.exports = User;
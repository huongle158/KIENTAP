const mongoose = require('mongoose');

var adminSchema = new mongoose.Schema({
	adminCreateDay: Date,
	adminName: String,
	adminEmail: String,
	adminPassword: String,
	adminPhone: String,
	adminAddress: String,
	adminAvt: String,
	adminTinh: String,
	adminHuyen: String,
	adminRole: String,
	},
    {
    	versionKey: false
    }
)

var Admin = mongoose.model('Admin', adminSchema, 'admin');

module.exports = Admin;
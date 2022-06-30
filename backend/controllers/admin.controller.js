var Admin = require("../models/admin.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 	

module.exports.index = async function(req, res) {
	var admins = await Admin.find();
	res.json(admins);
};
module.exports.list = async function(req, res) {
	var admins = await Admin.find();
	res.json(admins); 
};
module.exports.listId = function(req, res) {
	var id = req.params.id;
	Admin.findById({ _id: id }).then(function(admins) {
		res.json(admins);
	})
}
module.exports.info = function(req, res) {
	var id = req.params.id;
	Admin.findById({ _id: id }).then(function(admins) {
		res.json(admins);
	})
}

module.exports.postLogin = async function(req, res) {
	var email = req.body.loginEmail;
	var password = req.body.loginPassword;
 
	var admin = await Admin.findOne({ adminEmail: email });

	if (!admin) {
		return res.status(400).send('Email is not found!');
	}

	const validPassword = await bcrypt.compare(password, admin.adminPassword);
	if (!validPassword) {
		return res.status(400).send('Wrong password!');
	} 

	const token = jwt.sign({admin}, 'hahaha');
	res.status(200).json({token: token, admin: admin});
};

module.exports.register = async function(req, res) {
	var password = req.body.adminPassword;
	var admin = Admin.findOne({ adminEmail: req.body.adminEmail });

	if (admin) {
		console.log(admin)
		// return res.status(400).send('Email already exists!');
	}
	
	try {
		const salt = await bcrypt.genSalt();
		req.body.password = await bcrypt.hash(password, salt);
	} catch(err) {
		console.log(err);
	}

	const data = {
		adminAvt: "http://pe.heromc.net:4000/images/16f9bbf512b66a228f7978e34d8fb163",
		adminName: req.body.adminName,
		adminTinh: "",
		adminHuyen: "",
		adminAddress: "",
		adminPhone: "",
		adminEmail: req.body.adminEmail,
		adminPassword: req.body.password,
		adminRole: req.body.adminRole,
		adminCreateDay: new Date,
	}

	await Admin.create(data);
	res.status(200).send('Register success');
}


module.exports.updateAdmin = async function(req, res) {
	var id = req.params.id;
 
	if (req.files.length > 0) {
		const imgArr = [];
		req.files.map((item)=>{
			imgArr.push(`http://pe.heromc.net:4000/${item.path.split("/").slice(1).join("/")}`)
		})
		const img = {
			adminAvt: imgArr[0]
		}
		Admin.findByIdAndUpdate(
			{_id: id}, img,
			function (error) {
			}
		)
	}

	if(req.body.adminPassword !== "") {
		try {
			const salt = await bcrypt.genSalt();
			req.body.password = await bcrypt.hash(req.body.adminPassword, salt);
		} catch {}
		await Admin.findByIdAndUpdate(
			{_id: id}, {adminPassword: req.body.password},
			function (error) {
			}
		)
	}

	if (req.body.fromAdmin) {
		await Admin.findByIdAndUpdate(
			{_id: id}, {
				adminRole: req.body.adminRole,
				adminName: req.body.adminName,
				adminEmail: req.body.adminEmail
			},
			function (error) {
			}
		)
	} else {
		const data = {
			adminName: req.body.adminName,
			adminEmail: req.body.adminEmail,
			adminTinh: req.body.adminTinh,
			adminHuyen: req.body.adminHuyen,
			adminPhone: req.body.adminPhone,
			adminAddress: req.body.adminAddress
		}
		await Admin.findByIdAndUpdate(
			{_id: id}, data,
			function (error) {
			}
		)
	}

	var admin = await Admin.findOne({ _id: id });

	const token = jwt.sign({admin}, 'hahaha');
	res.status(200).json({token: token, admin: admin});
}

module.exports.deleteAdmin = async function(req, res) {
	await Admin.findByIdAndRemove({_id: req.body.id})
	res.status(200).send("ok");
}
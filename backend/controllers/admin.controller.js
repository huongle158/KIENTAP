var Admin = require("../models/admin.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var refreshTokens = [];

module.exports.index = async function (req, res) {
	var admins = await Admin.find();
	res.json(admins);
};
module.exports.list = async function (req, res) {
	var admins = await Admin.find();
	res.json(admins);
};
module.exports.listId = function (req, res) {
	var id = req.params.id;
	Admin.findById({ _id: id }).then(function (admins) {
		res.json(admins);
	})
}
module.exports.info = function (req, res) {
	var id = req.params.id;
	Admin.findById({ _id: id }).then(function (admins) {
		res.json(admins);
	})
}

const generateAccessToken = function (user) {
	return token = jwt.sign({ user },
		process.env.SECRET_KEY,
		{ expiresIn: "30s" });
}

const generateRefreshToken = function (user) {
	return token = jwt.sign({ user },
		process.env.REFRESH_KEY,
		{ expiresIn: "365d" });
}

/*
{
	"email": "abb@uel.vn",
	"password": "123"
}
*/
module.exports.postLogin = async function (req, res) {
	try {
		var email = req.body.email;
		var password = req.body.password;
		var admin = await Admin.findOne({ adminEmail: email });
		if (!admin) {
			return res.status(400).send('Email is not found!');
		}

		const validPassword = await bcrypt.compare(password, admin.adminPassword);

		if (!validPassword) {
			return res.status(400).send('Wrong password!');
		}

		if (admin && validPassword) {
			const accessToken = generateAccessToken(admin);
			const refreshToken = generateRefreshToken(admin);
			refreshTokens.push(refreshToken);
			res.cookie("refreshToken", refreshToken, {
				httpOnly: true,
				secure: false,
				path: "/",
				sameSite: "strict"
			})
			const {adminPassword, ...others} = admin._doc
			return res.status(200).json({ ...others, accessToken });
		}
	}
	catch (err) {
		console.log(err)
	}

};

module.exports.requestRefreshToken = async function (req, res) {
	const refreshToken = req.cookies.refreshToken;
	if (!refreshToken)
		return res.status(401).json("You're not authenticated");
	if (!refreshTokens.includes(refreshToken)) {
		return res.status(403).json("Invalid refresh token!");
	}
	jwt.verify(refreshToken, process.env.REFRESH_KEY, (err, admin) => {
		if (err) {
			console.log(err);
		}
		refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

		const newAccessToken = generateAccessToken(admin);
		const newRefreshToken = generateRefreshToken(admin);
		refreshTokens.push(newRefreshToken);
		res.cookie("refreshToken", newRefreshToken, {
			httpOnly: true,
			secure: false,
			path: "/",
			sameSite: "strict"
		})
		res.status(200).json({ accessToken: newAccessToken })
	})
}

/*
{
	"email": "abb@uel.vn",
	"password": "123",
	"adminName": "Ý"
}
*/
module.exports.register = async function (req, res) {
	var password = req.body.password;
	var admin = await Admin.findOne({ adminEmail: req.body.email }).exec();

	if (admin) {
		return res.status(400).send('Email already exists!');
	}

	try {
		const salt = await bcrypt.genSalt();
		req.body.password = await bcrypt.hash(password, salt);
	} catch (err) {
		console.log(err);
	}

	const data = {
		adminAvt: "http://pe.heromc.net:4000/images/16f9bbf512b66a228f7978e34d8fb163",
		adminName: req.body.adminName,
		adminTinh: "",
		adminHuyen: "",
		adminAddress: "",
		adminPhone: "",
		adminEmail: req.body.email,
		adminPassword: req.body.password,
		adminRole: req.body.adminRole,
		adminCreateDay: new Date,
	}

	await Admin.create(data);
	res.status(200).send('Register success');
}

module.exports.logOut = async function (req, res) {
	res.clearCookie("refreshToken");
	refreshTokens = refreshTokens.filter(token => token !== req.cookies.refreshToken);
	res.status(200).json("Logout successfully!")

}

module.exports.updateAdmin = async function (req, res) {
	var id = req.params.id;

	if (req.body.adminPassword !== "") {
		try {
			const salt = await bcrypt.genSalt();
			req.body.password = await bcrypt.hash(req.body.adminPassword, salt);
		} catch (error) {
			return res.status(500).json(error)
		}
		await Admin.findByIdAndUpdate(
			{ _id: id }, { adminPassword: req.body.password },
			function (error) {
				return res.status(500).json(error)
			}
		)
	}

	if (req.body.fromAdmin) {
		await Admin.findByIdAndUpdate(
			{ _id: id }, {
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
			{ _id: id }, data,
			function (error) {
			}
		)
	}

	// var admin = await Admin.findOne({ _id: id });

	// const token = jwt.sign({ admin }, process.env.SECRET_KEY, { expiresIn: "60s" });
	// res.status(200).json({ token: token, admin: admin });

}

module.exports.deleteAdmin = async function (req, res) {
	await Admin.findByIdAndRemove({ _id: req.params.id })
	res.status(200).send("ok");
}
var User = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var refreshTokens = [];

module.exports.index = async function (req, res) {
	var users = await User.find();
	res.json(users);
};

module.exports.list = async function (req, res) {
	var users = await User.find().select("-password")
	res.json(users);
};

module.exports.listId = function (req, res) {
	var id = req.params.id;
	User.findById({ _id: id }).select("-password").then(function (users) {
		res.json(users);
	})
}
module.exports.info = function (req, res) {
	var id = req.params.id;
	User.findById({ _id: id }).select("-password").then(function (users) {
		res.json(users);
	})
}

const generateAccessToken = function (user) {
	return token = jwt.sign({ id: user.id, admin: user.admin },
		process.env.SECRET_KEY,
		{ expiresIn: "30m" });
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
		var user = await User.findOne({ email: email }).select("+password").exec();
		if (!user) {
			return res.status(400).send('Email is not found!');
		}

		const validPassword = await bcrypt.compare(password, user.password);

		if (!validPassword) {
			return res.status(400).send('Wrong password!');
		}

		if (user && validPassword) {
			const accessToken = generateAccessToken(user);
			const refreshToken = generateRefreshToken(user);
			refreshTokens.push(refreshToken);
			res.cookie("refreshToken", refreshToken, {
				httpOnly: true,
				secure: false,
				path: "/",
				sameSite: "strict"
			})
			const { password, ...others } = user._doc
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
	jwt.verify(refreshToken, process.env.REFRESH_KEY, (err, user) => {
		if (err) {
			console.log(err);
		}
		refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

		const newAccessToken = generateAccessToken(user);
		const newRefreshToken = generateRefreshToken(user);
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
	"userName": "Ý"
}
*/
module.exports.register = async function (req, res) {
	var password = req.body.password;
	var user = await User.findOne({ email: req.body.email }).exec();

	if (user) {
		return res.status(400).send('Email already exists!');
	}

	try {
		const salt = await bcrypt.genSalt();
		req.body.password = await bcrypt.hash(password, salt);
	} catch (err) {
		console.log(err);
	}

	const data = {
		avt: "http://localhost:5000/images/16f9bbf512b66a228f7978e34d8fb163.png",
		username: req.body.userName,
		usertinh: "",
		userhuyen: "",
		address: "",
		phone: "",
		email: req.body.email,
		password: req.body.password,
		userCreateDay: new Date,
	}

	await User.create(data);
	res.status(200).send('Register success');
}

module.exports.logOut = async function (req, res) {
	res.clearCookie("refreshToken");
	refreshTokens = refreshTokens.filter(token => token !== req.cookies.refreshToken);
	res.status(200).json("Logout successfully!")

}

module.exports.updateUser = async function (req, res) {
	var id = req.params.id;

	if (req.body.password !== "") {
		try {
			const salt = await bcrypt.genSalt();
			req.body.password = await bcrypt.hash(req.body.password, salt);
		} catch (error) {
			return res.status(500).json(error)
		}
		await User.findByIdAndUpdate(
			{ _id: id }, { password: req.body.password },
			function (error) {
				return res.status(400).json(error)
			}
		)
	}

	await User.findByIdAndUpdate(
		{ _id: id }, {
		admin: req.body.admin,
		username: req.body.username,
		email: req.body.email,
		tinh: req.body.tinh,
		huyen: req.body.huyen,
		phone: req.body.phone,
		address: req.body.address
	},
		function (error) {
			return res.status(400).json(error)
		}
	)
	res.status(200).send("Updated Successfully");


}


// var admin = await Admin.findOne({ _id: id });

// const token = jwt.sign({ admin }, process.env.SECRET_KEY, { expiresIn: "60s" });
// res.status(200).json({ token: token, admin: admin });


module.exports.deleteUser = async function (req, res) {
	await User.findByIdAndRemove({ _id: req.params.id })
	res.status(200).send("ok");
}
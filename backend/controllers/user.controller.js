var User = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 	

module.exports.index = async function(req, res) {
	var user = await User.find();
	res.json(user);
};
module.exports.list = async function(req, res) {
	var user = await User.find();
	res.json(user); 
};
module.exports.listId = function(req, res) {
	var id = req.params.id;
	User.findById({ _id: id }).then(function(user) {
		res.json(user);
	})
}
module.exports.info = function(req, res) {
	var id = req.params.id;
	User.findById({ _id: id }).then(function(user) {
		res.json(user);
	})
}
const generateAccessToken = function (user) {
	return token = jwt.sign({ user },
		process.env.SECRET_KEY,
		{ expiresIn: "60s" });
}

const generateRefreshToken = function (user) {
	return token = jwt.sign({ user },
		process.env.REFRESH_KEY,
		{ expiresIn: "365d" });
}

module.exports.postLogin = async function(req, res) {
	var email = req.body.email;
	var password = req.body.password;
 
	var user = await User.findOne({ userEmail: email });

	if (!user) {
		return res.status(400).send('Email is not found!');
	}

	const validPassword = await bcrypt.compare(password, user.password);
	if (!validPassword) {
		return res.status(400).send('Wrong password!');
	} 

	if(user && validPassword){
		const accessToken = generateAccessToken(user);
		const refreshToken = generateRefreshToken(user);
		res.cookie("refreshToken", refreshToken,{
			httpOnly: true,
			secure: false,
			path:"/",
			sameSite: "strict"
		})
		const {userPassword, ...others} = user._doc
		return res.status(200).json({ ...others, accessToken });

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



module.exports.register = async function(req, res) {
	var password = req.body.password;
	var user = User.findOne({ userEmail: req.body.email }).exec();

	if (user) {
		return res.status(400).send('Email already exists!');
	}
	
	try {
		const salt = await bcrypt.genSalt();
		req.body.password = await bcrypt.hash(password, salt);
	} catch(err) {
		console.log(err);
	}

	const data = {
		userAvt: "http://pe.heromc.net:4000/images/16f9bbf512b66a228f7978e34d8fb163",
		userName: req.body.userName,
		userTinh: "",
		userHuyen: "",
		userAddress: "",
		userPhone: "",
		userEmail: req.body.email,
		userPassword: req.body.password,
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

module.exports.updateUser = async function(req, res) {
	var id = req.params.id;
 
	if (req.files.length > 0) {
		const imgArr = [];
		req.files.map((item)=>{
			imgArr.push(`http://pe.heromc.net:4000/${item.path.split("/").slice(1).join("/")}`)
		})
		const img = {
			userAvt: imgArr[0]
		}
		User.findByIdAndUpdate(
			{_id: id}, img,
			function (error) {
			}
		)
	}

	if(req.body.userPassword !== "") {
		try {
			const salt = await bcrypt.genSalt();
			req.body.password = await bcrypt.hash(req.body.userPassword, salt);
		} catch {}
		await User.findByIdAndUpdate(
			{_id: id}, {userPassword: req.body.password},
			function (error) {
			}
		)
	}

	if (req.body.fromUser) {
		await User.findByIdAndUpdate(
			{_id: id}, {
				userRole: req.body.userRole,
				userName: req.body.userName,
				userEmail: req.body.email
			},
			function (error) {
			}
		)
	} else {
		const data = {
			userName: req.body.userName,
			userEmail: req.body.userEmail,
			userTinh: req.body.userTinh,
			userHuyen: req.body.userHuyen,
			userPhone: req.body.userPhone,
			userAddress: req.body.userAddress
		}
		await User.findByIdAndUpdate(
			{_id: id}, data,
			function (error) {
                console.log(error)
			}
		)
	}

	// var user = await User.findOne({ _id: id });

	// const token = jwt.sign({user}, process.env.SECRET_KEY);
	// res.status(200).json({token: token, user: user});
}

module.exports.deleteUser = async function(req, res) {
	await User.findByIdAndRemove({_id: req.body.id})
	res.status(200).send("ok");
}
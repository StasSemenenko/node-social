const Users = require("../models/users");
const md5 = require("md5");


module.exports = {
	signupPage(req, res) {
		res.render("signup", {

		})
	},
	signinPage(req, res) {
		res.render("signin", {
			isAuth: true
		})
	},
	async createAccount(req, res) {
		var { email, name, password, password2, info} = req.body;
		if(password !== password2){
			return res.render("signup", {
				error: "Пароли не совпадают"
			})
		}
		if(password.length < 6 || password2.length < 6){
			return res.render("signup", {
				error: "Пароль должен быть длинее 6 сиволов"
			})
		}
		try {
			var user = await Users.findOne({email});
			if(user) {
				res.render("signup", {
					error: "Пользователь уже существует!"
				})
			}
			else {
				const new_user = await Users.create({
					email,
					name,
					password: md5(password),
					info
				})
				res.cookie("user_id", new_user._id, { expires: new Date(Date.now() + 900000)});
				res.cookie("name", new_user.name, { expires: new Date(Date.now() + 900000)});
				res.redirect("/");
			}
		}
		catch (e) {
			console.log(e);
		}
	},
	signout(req, res) {
		res.clearCookie("author");
		res.clearCookie("name");
		res.clearCookie("user_id");
		res.redirect("/");
	},
	async loginAccount(req, res) {
		try {
			const {email, password} = req.body;
	
			var user = await Users.findOne({ email, password: md5(password)})
			// console.log(user);
			if (user) {
				res.cookie("user_id", user._id, { expires: new Date(Date.now() + 31536000000.42889)});
				res.cookie("name", user.name, { expires: new Date(Date.now() + 31536000000.42889)});
				res.redirect("/"); 
			}
			else {
				res.render("signIn", {
					error: "Не верные данные!"
				})
			}
		}
		catch (e) {
			console.log(e)
		}
	}

}
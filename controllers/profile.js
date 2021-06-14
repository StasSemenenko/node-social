const Posts = require("../models/posts");
const Users = require("../models/users");
const path = require("path");
const md5 = require("md5");

module.exports  = {
	async profileEditPage(req, res) {
		try {
			var id = req.cookies.user_id;
			if (!id) return res.redirect("/");
			var user = await Users.findOne({_id: id}).lean();
			res.render("profile-edit", {
				user
			});
		}
		catch(e) {
			res.render("errors",{code: "404"});
		}
	}, 
	async changeProfile(req, res) {
		try {
			var id = req.cookies.user_id;
			var {name, info, email, password} = req.body;
			var update = {name, info, email};
			var user = {name,info,email};
			if (password) update.password = md5(password);
			if (info.length > 50){
				res.render("profile-edit", {
				   user,
				   error: "Информация о Вас не должна привышать 50 символов"
			   });
		   }
			if (password.length < 6) {
				return res.render("profile-edit", {
					user,
					error2: "Пароль должен быть длинее 6 символов"
				});
			}
			await Users.updateOne({_id: id}, update);
			res.redirect(`/users/${id}`);
		}
		catch(e) {
			res.render("errors",{code: "500"});
		}
	}, 
	async editPhotoProfile(req, res) {
		try {
			var id = req.cookies.user_id;
			if(!req.files.avatar) return res.render("erors",{code: "500"});
			var type = req.files.avatar.name.split(".").pop();
			var avatarPath = path.resolve(__dirname, "..", "public/img/avatars", `${id}.${type}`);
			var avatarPathDb = `/public/img/avatars/${id}.${type}`;
			await req.files.avatar.mv(avatarPath);
			await Users.updateOne({_id: id}, {img: avatarPathDb});

			res.redirect(`/users/${id}`);
		}
		catch (e) {
			res.render("errors",{code: "500"});
		}
	}

}
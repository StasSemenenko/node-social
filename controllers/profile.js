const Posts = require("../models/posts");
const Users = require("../models/users");
const path = require("path");
const md5 = require("md5");

module.exports = {
	// async profilePage(req, res) {
	// 	try {
	// 		var name = req.cookies.name;
	// 		var user_id = req.cookies.user_id;
	// 		var posts = await Posts.find({author: user_id}).sort({ date: - 1}).populate("author").lean();
	// 		var user = await Users.findOne({_id: user_id}).lean();
	// 		// (posts);
	// 		res.render("profile", {
	// 			isProfile: true,
	// 			posts,
	// 			user

	// 		})
	// 		// console.log(user);
	// 	}
	// 	catch (e) {
	// 		console.log(e);
	// 	}
	// }, 
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
			console.log(e);
		}
	}, 
	async changeProfile(req, res) {
		try {
			var id = req.cookies.user_id;
			var {name, info, email, password} = req.body;
			var update = {name, info, email};
			if (password) update.password = md5(password);
			// if(password = "") password = {{user.password}}
			// console.log("update:", update, req.body);
			var user = await Users.updateOne({_id: id}, update);
			res.redirect(`/users/${id}`);
		}
		catch(e) {
			console.log(e);
		}
	}, 
	async editPhotoProfile(req, res) {
		try {
			var id = req.cookies.user_id;
			if(!req.files.avatar) return res.redirect("/404");
			var type = req.files.avatar.name.split(".").pop();
			var avatarPath = path.resolve(__dirname, "..", "public/img/avatars", `${id}.${type}`);
			var avatarPathDb = `/public/img/avatars/${id}.${type}`;
			await req.files.avatar.mv(avatarPath);
			await Users.updateOne({_id: id}, {img: avatarPathDb});

			res.redirect(`/users/${id}`);
		}
		catch (e) {
			console.log(e);
		}
	}

}
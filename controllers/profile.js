const Posts = require("../models/posts");
const Users = require("../models/users");

module.exports = {
	// async profilePage(req, res) {
	// 	try {
	// 		var name = req.cookies.name;
	// 		var user_id = req.cookies.user_id;
	// 		var posts = await Posts.find({author: user_id}).sort({ date: - 1}).populate("author").lean();
	// 		var user = await Users.findOne({_id: user_id}).lean();
	// 		// console.log(posts);
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
			var {name, info} = req.body;
			var update = {name, info};
			console.log("update:", update, req.body);
			var user = await Users.updateOne({_id: id}, update);
			res.redirect(`/users/${id}`);
		}
		catch(e) {
			console.log(e);
		}
	}

}
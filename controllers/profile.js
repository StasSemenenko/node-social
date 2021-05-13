const Posts = require("../models/posts");
const Users = require("../models/users");

module.exports = {
	async profilePage(req, res) {
		try {
			var name = req.cookies.name;
			var user_id = req.cookies.user_id;
			var posts = await Posts.find({author: user_id}).sort({ date: - 1}).lean();
			var user = await Users.findOne({_id: user_id}, {password: 0}).lean();
			// console.log(user);
			res.render("profile", {
				posts,
				user

			})
		}
		catch (e) {
			console.log(e);
		}
	}
}
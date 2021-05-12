const Posts = require("../models/posts");
const Users = require("../models/users");

module.exports = {
	async profilePage(req, res) {
		try {
			var name = res.locals.name;
			var id = res.locals.author;
			var posts = await Posts.find({author: id}).sort({ date: - 1}).lean();
			var user = await Users.findOne({_id: id}, {password: 0}).lean();
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
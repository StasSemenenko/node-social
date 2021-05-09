const Posts = require("../models/posts");
const Users = require("../models/users");

module.exports = {
	async homePage(req, res) {
		try {
			var name = res.locals.name;
			var id = res.locals.user_id;
			var posts = await Posts.findOne({id}).lean();
			// var user = await Users.findOne({_id : id}).lean();
			console.log()
			res.render("profile", {
				posts: req.post


			})
		}
		catch (e) {
			console.log(e);
		}
	}
}
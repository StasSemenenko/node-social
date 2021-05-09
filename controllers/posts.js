const Posts = require("../models/posts");
const users = require("../models/users");


module.exports = {
	async homePage(req, res) {
		try {

			var posts = await Posts.find().sort({ post: - 1}).lean();
			res.render("index", {
				posts
				
			})
		}
		catch(e) {
			res.render("404");
		}
	},
	async createPost(req, res) {
		var {post, comment } = req.body;
		try {
			var new_post = await Posts.create({
				
				user_id: res.locals.user_id,
				post,
				comment,
				date: new Date()
			})
			res.redirect("/");
			console.log( req.body);
		}
		catch (e) {
			console.log(e);
		}
		
	},
	postPage(req, res) {
		res.render("add", {})
	}
}
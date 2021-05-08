const Posts = require("../models/posts");
const users = require("../models/users");


module.exports = {
	async homePage(req, res) {
		try {

			var posts = await Posts.find({});
			res.render("index", {
				title: "Пост",
				comment: "Это комментарий",
				
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
				// user_id: req.cookies.user_id,
				post,
				comment
			})
			res.redirect("/");
			console.log( "KYKYKYKYKYKYKY");
		}
		catch (e) {
			console.log(e);
		}
		
	}
}
const Posts = require("../models/posts");


module.exports = {
	async homePage(req, res) {
		try {

			var posts = await Posts.find({});
			res.render("home", {
				title: "Главная",
				post: "Пост",
				comment: "Это комментарий"
			})
		}
		catch(e) {
			res.render("404");
		}
	},
	createPost(req, res) {
		
	}
}
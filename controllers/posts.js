const Posts = require("../models/posts");
const users = require("../models/users");
const moment = require("moment");


module.exports = {
	async homePage(req, res) {
		try {
			var posts = await Posts.find().sort({ date: - 1}).populate("author", "-password").lean();
			res.render("index", {
				posts
				
			})
			posts.forEach(abc => console.log(abc.author.img));
		}
		catch(e) {
			console.log(e);
			res.render("404");
		}
	},
	async createPost(req, res) {
		var {content, name} = req.body;
		try {
			
			var new_post = await Posts.create({
				
				author: req.cookies.user_id,
				name,
				content

				
			})
			res.redirect("/");
			console.log( res.locals.name);
		}
		catch (e) {
			console.log(e);
		}
		
	},
	async postPage(req, res) {
		res.render("post-create");
	// 	const posts = await Posts.find().populate("author", "-password");
	// 	res.send(posts);
	}
}
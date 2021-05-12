const Posts = require("../models/posts");
const users = require("../models/users");
const moment = require("moment");


module.exports = {
	async homePage(req, res) {
		try {
			
			var posts = await Posts.find().sort({ date: - 1}).lean();
			res.render("index", {
				posts
				
			})
			console.log(posts.author.img)
		}
		catch(e) {
			res.render("404");
		}
	},
	async createPost(req, res) {
		var {content} = req.body;
		try {
			var name = res.locals.name;
			var new_post = await Posts.create({
				
				author: res.locals.author,
				name: res.locals.name,
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
		// res.render("post-create");
		const posts = await Posts.find().populate("author", "-password");
		res.send(posts);
	}
}
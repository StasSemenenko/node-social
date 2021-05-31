const Posts = require("../models/posts");
const Comments = require("../models/comments");
const users = require("../models/users");
const moment = require("moment");
const html = require("htmlspecialchars");


module.exports = {
	async homePage(req, res) {
		try {
			var posts = await Posts.find().sort({ date: - 1}).populate("author", "-password").lean();
			res.render("index", {
				isHome: true,
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
				isAdd: true,
				author: req.cookies.user_id,
				name,
				content

				
			})
			res.redirect("/");
			res.locals.post_id = req.cookies.user_id;
			// console.log( new_post._id);
		}
		catch (e) {
			console.log(e);
		}
		
	},
	async createPostPage(req, res) {
		res.render("post-create");
	// 	const posts = await Posts.find().populate("author", "-password");
	// 	res.send(posts);
	},
	async postPage(req, res) {
		try {
			var id = req.params.id;
			var comments = await Comments.find({post: id}).populate("author").lean();
			var post = await Posts.findOne().populate("author").lean();
			if(!post) return res.redirect("/");
			// return res.send({post, comments});
			res.render("postPage", {
				post,
				comments
			});

		}
		catch (e) {
			console.log(e);
		}
	},
	async createComment(req, res) {
		var {comment} = req.body;
		try {
			var new_comment = await Comments.create({
				author: req.cookies.user_id,
				post: req.params.id,
				comment: html(comment)
			})
			res.redirect("/posts");
			
		}
		catch (e) {
			console.log(e);
		}
	}

	}

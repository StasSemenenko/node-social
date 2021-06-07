const Posts = require("../models/posts");
const Comments = require("../models/comments");
const users = require("../models/users");
const moment = require("moment");
const html = require("htmlspecialchars");


module.exports = {
	async homePage(req, res) {
		try {
			// var id = req.body;
			var posts = await Posts.find().sort({ date: - 1}).populate("author", "-password").lean();
			// var comments = await Comments.countDocuments();
			for (var post of posts) {
				post.comments = await Comments.countDocuments({post: post._id});
			}
			// res.send(comments);
			res.render("index", {
				isHome: true,
				posts
				
			})
			// console.log(posts);
			// posts.forEach(abc => console.log(abc.author.img));
		}
		catch(e) {
			console.log(e);
			res.render("404");
		}
	},
	async createPost(req, res) {
		var {content, name, color} = req.body;
		try {
			// console.log(name, content, color);
			var new_post = await Posts.create({
				isAdd: true,
				author: req.cookies.user_id,
				name,
				content,
				color

				
			})
			res.redirect("/");
			res.locals.post_id = req.cookies.user_id;
			// console.log(name, content, color);
		}
		catch (e) {
			console.log(e);
		}
		
	},
	async editPostPage(req, res) {
		try{
			var id = req.params.id;
			if (!id) return res.redirect("/");
			var post = await Posts.findOne({_id: id}).lean();
			res.render("post-edit", {
				post
			});
		}
		catch(e) {
			console.log(e);
		}
	},
	async updatePost(req, res) {
		try {
			var {id} = req.params;
			var {name, content, color} = req.body;
			var update = {name, content, color};
			await Posts.updateOne({_id: id}, update);
			
			res.redirect("/");
		}
		catch(e) {
			console.log(e);
		}
	}, 
	async removePost(req, res) {
		var id = req.params.id;
		// console.log("id:", id)
		try {
			await Posts.deleteOne({ _id : id});
			await Comments.deleteMany({post: id});
			res.redirect(req.get('referer'));
		}
		catch(e) {
			console.log(e);
		}
		
	},
	async removeComment(req, res) {
		var id = req.params.id;
		try {
			// await Posts.deleteOne({ _id : id});
			await Comments.deleteOne({_id: id});
			res.redirect('back');
		}
		catch(e) {
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
			var comments = await Comments.find({post : id}).populate("author").lean();
			var post = await Posts.findOne({_id : id}).populate("author").lean();
			if(!post) return res.redirect("/");
			// return res.send({ comments});
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
		var id = req.params.id;
		var {comment} = req.body;
		try {
			var new_comment = await Comments.create({
				author: req.cookies.user_id,
				post: req.params.id,
				comment: html(comment)
			})
			res.redirect(`/posts/${id}`);
			
		}
		catch (e) {
			console.log(e);
		}
	}

}

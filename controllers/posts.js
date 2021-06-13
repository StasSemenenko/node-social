const Posts = require("../models/posts");
const Comments = require("../models/comments");
const Likes = require("../models/likes");
const Users = require("../models/users");
const moment = require("moment");
const html = require("htmlspecialchars");
const { countDocuments } = require("../models/posts");
const mongoose = require("mongoose");
const path = require("path");


module.exports = controller = {
	async getAllPosts(user_id, search) {
		try {
			var posts = await Posts.find(search).sort({ date: - 1}).populate("author").populate("likes").lean();
			for (var post of posts) {
				post.comments = await Comments.countDocuments({post: post._id});
				post.liked = !!post.likes.find(i => i._id.toString() == user_id);
				post.content = post.content.replace(/\n/gi, "</br>");
			}
			return posts;
		}
		catch(e) {
			console.log(e);
		}
	},

	async homePage(req, res) {
		try {
			var {post_id} = req.body;
			var posts = await controller.getAllPosts(req.cookies.user_id);
			// res.send(posts);
			// console.log(posts);
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
		console.log(req.files);
		if (!name) return  res.render("post-create",{
			error: "Введите название поста"
		});
		if(!content) content = " ";
		try {
			var data = {
				_id: mongoose.Types.ObjectId(),
				author: req.cookies.user_id,
				name,
				content,
				color
			}
			if(req.files.img){
				var type = req.files.img.name.split(".").pop();
				var img = path.resolve(__dirname, "..", "public/img/posts", `${data._id}.${type}`);
				await req.files.img.mv(img);
				data.img = `/public/img/posts/${data._id}.${type}`;
			}

			await Posts.create(data);
			res.redirect("/");
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
			if (post.author._id.toString() != req.cookies.user_id) return res.redirect("/");
			
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
			var post = await Posts.findOne({_id: id});
			if (post.author._id.toString() != req.cookies.user_id) return res.redirect("/");
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
			var post = await Posts.findOne({_id: id});
			if (post.author._id.toString() != req.cookies.user_id) return res.redirect("/");
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
			var comment = await Comments.findOne({_id : id}).lean();
			if (comment.author.toString() != req.cookies.user_id) return res.redirect("/");
			await Comments.deleteOne({_id: id});
			res.redirect(req.get('referer'));
		}
		catch(e) {
			console.log(e);
		}
	},
	async createPostPage(req, res) {
		res.render("post-create");
		// const posts = await Posts.find().populate("author", "-password");
		// res.send(posts);
	},
	async postPage(req, res) {
		try {
			var id = req.params.id;
			var comments = await Comments.find({post : id}).populate("author").lean();
			var post = await Posts.findOne({_id : id}).populate("author").lean();
			if(!post) return res.redirect("/");
			post.liked = !!post.likes.find(i => i == req.cookies.user_id);
			post.content = post.content.replace(/\n/gi, "</br>");
			// return res.send({ comments});
			// res.send(post)
			res.render("post-page", {
				post,
				comments
			});

		}
		catch (e) {
			console.log(e);
		}
	},
	async search(req, res) {
		try{
			var {search} = req.body;
			var text = new RegExp(search, "gi");
			var posts = await Posts.find({$or: [{name: text}, {content: text}]}).populate("author").lean();
			
			for (var post of posts) {
				post.comments = await Comments.countDocuments({post: post._id});
			}
			res.render("index", {
				posts,
				error: "Нет совпадений"
			})
		}
		catch(e) {
			console.log(e);
		}
	},
	async like(req, res) {
		try {
			var{id} = req.params;
			var user_id = req.cookies.user_id;
			var post = await Posts.findOne({_id: id}).lean();
			if(post.liked = !!post.likes.find(i => i == req.cookies.user_id)){
				await Posts.updateOne({_id: id},{
					$pull:{likes: user_id}
				})
			}
			else {
				await Posts.updateOne({_id: id},{
					$addToSet:{likes: user_id}
				})
			}
			res.redirect("back");

		}
		catch(e) {
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
	},
	async editCommentPage(req, res) {
		try{
			var {post_id} = req.body
			var id = req.params.id;
			if (!id) return res.redirect("/");
			var comment = await Comments.findOne({_id: id}).lean();
			if (comment.author._id.toString() != req.cookies.user_id) return res.redirect("/");
			res.cookie("post_id", post_id);
			res.render("comment-edit", {
				comment
			});
		}
		catch(e) {
			console.log(e);
		}
	},
	async editComment(req, res) {
		try {
			var {id} = req.params;
			var {comment} = req.body;
			var comment = await Comments.findOne({_id: id});
			if (comment.author._id.toString() != req.cookies.user_id) return res.redirect("/");
			await Comments.updateOne({_id: id}, {comment});
			res.redirect("/posts/" + comment.post);
				
		}
		catch(e) {
			console.log(e);
		}
	},
}

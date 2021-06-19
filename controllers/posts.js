const Posts = require("../models/posts");
const Comments = require("../models/comments");
const Likes = require("../models/likes");
const Users = require("../models/users");
const moment = require("moment");
const html = require("htmlspecialchars");
// const { countDocuments, findById } = require("../models/posts");
const mongoose = require("mongoose");
const path = require("path");
const fs = require('fs');



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
			res.render("errors",{code: "500"});	
		}
	},

	async homePage(req, res) {
		try {
			var {post_id} = req.body;
			var posts = await controller.getAllPosts(req.cookies.user_id);
			res.render("index", {
				isHome: true,
				posts
			})

		}
		catch(e) {
			res.render("errors",{code: "500"});	
		}
	},
	async createPost(req, res) {
		var {content, name, color, d2} = req.body;
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
			if(d2 != 1) {
				if(req.files && req.files.img){
					var type = req.files.img.name.split(".").pop();
					var img = path.resolve(__dirname, "..", "public/img/posts", `${data._id}.${type}`);
					await req.files.img.mv(img);
					data.img = `/public/img/posts/${data._id}.${type}`;
				}
			}
			await Posts.create(data);
			res.redirect("/");
		}
		catch (e) {
			res.render("errors",{code: "500"});
		}
		
	},
	
	async editPostPage(req, res) {
		try{
			var id = req.params.id;
			if (!id) return res.redirect("/");
			var post = await Posts.findOne({_id: id}).lean();
			if (post.author._id.toString() != req.cookies.user_id) return res.redirect("/");
			// console.log(post.author._id, req.cookies.user_id)
			res.render("post-edit", {
				post
			});
		}
		catch(e) {
			res.render("errors",{code: "404"});
		}
	},
	async updatePost(req, res) {
		var {id} = req.params;
		var {name, content, color, d2} = req.body;
		var update = {name, content, color};
		if (!name) return res.redirect("back");
		// if(!content) content = " ";
		try {
			var post = Posts.findOne({_id: id}).populate("author").lean();
			// if (post.author != req.cookies.user_id) return res.redirect("/users");
			if(d1 = 1) update.img = "";
			if(d2 != 1){
				if(req.files && req.files.img){
					var type = req.files.img.name.split(".").pop();
					var img = path.resolve(__dirname, "..", "public/img/posts", `${id}.${type}`);
					await req.files.img.mv(img);
					update.img = `/public/img/posts/${id}.${type}`;
				}
			}
			// console.log(req.body.img)
			await Posts.updateOne({_id: id}, update);
			res.redirect("/");
		}
		catch(e) {
			// res.render("errors",{code: "500"});
			console.log(e)	
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
			res.render("errors",{code: "500"});	
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
			res.render("errors",{code: "500"});
		}
	},
	async createPostPage(req, res) {
		try {
			res.render("post-create");
		}
		catch(e) {
			res.render("errors",{code: "404"});
		}
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
			res.render("errors",{code: "404"});
		}
	},
	async search(req, res) {
		try{
			var {search} = req.body;
			var text = new RegExp(search, "gi");
			var posts = await Posts.find({$or: [{name: text}, {content: text}]}).sort({ date: - 1}).populate("author").lean();
			
			for (var post of posts) {
				post.comments = await Comments.countDocuments({post: post._id});
			}
			res.render("index", {
				posts,
				error: "Нет совпадений"
			})
		}
		catch(e) {
			res.render("errors",{code: "500"});
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
			res.render("errors",{code: "500"});
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
			res.render("errors",{code: "500"});
		}
	},
	async editCommentPage(req, res) {
		try{
			var id = req.params.id;
			if (!id) return res.redirect("/");
			var comment = await Comments.findOne({_id: id}).lean();
			if (comment.author._id.toString() != req.cookies.user_id) return res.redirect("/");
			res.render("comment-edit", {
				comment
			});
		}
		catch(e) {
			res.render("errors",{code: "404"});
		}
	},
	async editComment(req, res) {
		try {
			var {id} = req.params;
			var {comment} = req.body;
			var comments = await Comments.findOne({_id: id});
			if (comments.author._id.toString() != req.cookies.user_id) return res.redirect("/");
			await Comments.updateOne({_id: id}, {comment});
			res.redirect(`/posts/${comments.post}`);
				
		}
		catch(e) {
			// res.render("errors",{code: "500"});
			console.log(e)
			
		}
	},
}

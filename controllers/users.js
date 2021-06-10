const Users = require("../models/users");
const Posts = require("../models/posts");
const Comments = require("../models/comments");
const multer  = require("multer");



module.exports = {
	async getUsers(req, res) {
		try {
			var users = await Users.find().lean();
			// console.log(users);
			res.render("users", {
				isUsers: true,
				users
			})
		}
		catch (e) {
			console.log(e);
		}
	},
	async userPage(req, res) {
		try {
			var id = req.params.id;
			var posts = await Posts.find({author: id}).sort({ date: - 1}).populate("author").lean();
			var user = await Users.findOne({_id: id}).lean();
			if(!user) return res.redirect("/404");
			for (var post of posts) {
				post.comments = await Comments.countDocuments({post: post._id});
			}
			res.render("profile", {
				isProfile: true,
				user,
				posts

			})

			// res.send(user);
		}
		catch (e) {
			res.redirect("/404");
		}
	}, 
	async search(req, res) {
		try{
			var {search} = req.body;
			var users = await Users.find({name: search}).lean();
			if(!users) return res.redirect("/users");
			res.render("users", {
				users
			})
		}
		catch(e) {
			console.log(e);
		}
	}
}


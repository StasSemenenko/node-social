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
				title: "Пользователи",
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
	async upload(req, res, next) { 
			// let filedata = req.file;
			// console.log(filedata);
			// if(!filedata)
			// 	res.send("Ошибка при загрузке файла");
			// else
			// 	res.redirect("/");
		}
	}


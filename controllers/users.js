const Users = require("../models/users");
const Posts = require("../models/posts");
const Comments = require("../models/comments");
const multer  = require("multer");
const postsController = require("./posts")



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
			var search = {author: id};
			var user = await Users.findOne({_id: id}).lean();
			if(!user) return res.redirect("/404");
			var posts = await postsController.getAllPosts(req.cookies.user_id, search);
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
			var text = new RegExp(search, "gi");
			var users = await Users.find({name: text}).lean();
			res.render("users", {
				users,
				error: "Пользователь не найден"
				// founded: users.length > 0
			})
		}
		catch(e) {
			console.log(e);
		}
	}
}


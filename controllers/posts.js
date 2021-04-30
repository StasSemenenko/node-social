const Posts = require("../models/posts");


module.exports = {
	async homePage(req, res) {
		try {

			var posts = await Posts.find({});
			res.render("index", {
				title: "Главная",
				post: "Пост",
				comment: "Это комментарий",
				name:"1234567"
			})
		}
		catch(e) {
			res.render("404");
		}
	},
	createPost(req, res) {
		res.render("add", {
				title: "Добавить пост",
				string: "Введите название поста",
				comment: "Ввдедите описание поста ",
				name:"Создать пост"
			})
	}
}
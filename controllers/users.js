const Users = require("../models/users");


module.exports = {
	async getUsers(req, res) {
		try {
			var users = await Users.find().lean();
			console.log(users);
			res.render("users", {
				title: "Пользователи2345",
				users
			})
		}
		catch (e) {
			console.log(e);
		}
	}
}

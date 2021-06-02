module.exports = (req, res, next) => {
	if(!req.cookies.user_id) {
		return res.redirect("/auth/signin");
	}

	next()
}

module.exports = (req, res, next) => {
	if(req.cookies.author){
		res.locals.author = req.cookies.author;
		res.locals.name = req.cookies.name;
		res.locals.is_auth = true;
	}
	else {
		res.locals.is_auth = false;
	}
	next();
}
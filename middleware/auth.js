module.exports = (req, res, next) => {
	if(req.cookies.user_id){
		res.locals.user_id = req.cookies.user_id;
		res.locals.name = req.cookies.name;
		res.locals.is_auth = true;
	}
	else {
		res.locals.is_auth = false;
	}
	next();
}
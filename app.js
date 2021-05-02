const express = require("express");
const cookie_parser = require('cookie-parser');
const exphbs  = require('express-handlebars');
const path = require("path");
const config = require("config");
const auth_middleware = require("./middleware/auth");
const router = require("./routes");
const app = express();
require("./database");


app.engine('hbs', exphbs({extname: '.hbs'}));
app.set('view engine', 'hbs');
app.use(cookie_parser(config.cookiePassword));
app.use(auth_middleware);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, 'public')));
app.use(router);



app.listen(config.port, () => {
	console.log(`Server start on port ${config.port}`);
});

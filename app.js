const express = require("express");
const session = require("express-session");
const exphbs  = require('express-handlebars');
const path = require("path");
const config = require("config");
const router = require("./routes");
const app = express();
require("./database");


app.engine('hbs', exphbs({extname: '.hbs'}));
app.set('view engine', 'hbs');
app.use("/public", express.static(path.join(__dirname, 'public')));
app.use(router);



app.listen(config.port, () => {
	console.log(`Server start on port ${config.port}`);
});

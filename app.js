const express = require("express");
const multer  = require("multer");
const cookie_parser = require('cookie-parser');
const exphbs  = require('express-handlebars');
const path = require("path");
const config = require("config");
const MomentHandler = require("handlebars.moment");

const auth_middleware = require("./middleware/auth");
const router = require("./routes");
const app = express();
require("./database");

const hbs = exphbs.create({extname: '.hbs', helpers: require("./helpers")});
MomentHandler.registerHelpers(hbs.handlebars);


app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.use(cookie_parser(config.cookiePassword));
app.use(auth_middleware);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, 'public')));
app.use(multer({dest:"uploads"}).single("filedata"));
app.post("/upload", function (req, res, next) {
   
    let filedata = req.file;
    console.log(filedata);
    if(!filedata)
        res.send("Ошибка при загрузке файла");
    else
        res.redirect("/");
});
app.use(router);



app.listen(config.port, () => {
	console.log(`Server start on port ${config.port}`);
});

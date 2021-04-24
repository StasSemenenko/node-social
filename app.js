const express = require("express");
const path = require("path");
const session = require("express-session");
const config = require("config");
const router = require("./routes");
require("./database");


const app = express();
app.use(router);


app.listen(config.port, () => {
	console.log(`Server start on port ${config.port}`);
});

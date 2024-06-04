const express = require("express");
const app = express();
const cors = require("cors");

const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

//MIDDLEWARES
app.use(express.urlencoded({ extended: false }));
app.use(
	cors({
		origin: ["http://localhost:5173", "http://localhost:4173"],
		credentials: true,
	})
);
app.use(cookieParser());
app.use(fileUpload());

//PORTS
app.listen(3000);

// IMAGES -- GET

app.use(express.static("public"));

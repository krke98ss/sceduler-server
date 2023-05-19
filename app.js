const express =require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const home =require("./src/controllers");

const app = express();

app.use(cors({
  origin : process.env.FRONT_URL,
  methods : ["GET", "POST", "PUT", "DELETE"],
  credentials : true
}));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/", home);


module.exports= app;

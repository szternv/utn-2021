import express from "express";
import config from "./config";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import ejs from "ejs";

var session = require('express-session');
var whatever = require('./../models/bd');
var router = express.Router();
  var usuariosModel = require('../models/usuariosModel')
  var novedadesModel = require('../models/novedadesModel');
//   var pool  = mysql.createPool({
// 	  connectionLimit:10,
// 	  host:process.env.MYSQL_HOST,
// 	  user:process.env.MYSQL_USER,
// 	  passwod:process.env.MYSQL_PASSWORD,
// 	  database:process.env.MYSQL_DB_NAME,
// 	});


var logger = require('morgan');
var cookieParser = require('cookieParser');

var loginRouter = require('./routes/admin/login');

import contact from "./routes/contact";
import novedades from "./routes/admin/novedades";


const app = express();


app.set("PORT", config.PORT);

app.use(session({
	secret: 'kasdjrybwehsdfjskdhjasdlsadhalf',
	resave: false,
	saveUninitialized: true
  }));

app.use(express.static(path.join(__dirname, 'public')));


app.use(cors());
app.use(morgan());
app.use(express.urlencoded({
	extended: false
}));
app.use(express.json());

app.use("/contact", contact);
app.use("/novedades", novedades);

app.use('/admin/login', loginRouter);

app.use(logger('dev'));
app.get(cookieParser());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');



  
var secured = async(req,res,next) =>{
	try{
		console.log(req.session.id_user)
	  if(req.session.id_user){
		next();
		return	
	  }else{
		  console.log("else");
		res.redirect('/admin/login');
	  }
  
	}catch(error){
	  console.log(error)
	}
  }

  



  app.get("/home", secured, (req, res,next)=>res.render("index.hbs"));
  app.get("/", (_, res) => res.render("admin/login.hbs"));



  module.exports = app;
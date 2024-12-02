import { Router } from "express";

var nodemailer = require('nodemailer');


const router = Router();

// var smtpTransport = nodemailer.createTransport("smtps://englishmadeasy21@gmail.com:"+encodeURIComponent('gatopancho21') + "@smtp.gmail.com:465"); 

let smtpTransport = nodemailer.createTransport({
	service: 'gmail',
    auth: {
      user: 'englishmadeasy21@gmail.com', // generated ethereal user
      pass: 'gatopancho21', // generated ethereal password
    },
  });

MYSQL_HOST = localhost
MYSQL_DB_NAME = user
MYSQL_USER = root 
MYSQL_PASSWORD = ''

smtpTransport.verify().then(()=>{

	console.log('si si');
})
.catch((error)=>{
	console.log(error);
})


router.post("/", async (req, res)=>{
	var body = req.body
	
	console.table(req.body);

	var mailOptions = {
		from: body.email,
		to: 'englishmadeasy21@gmail.com',
		subject: 'Consulta' + 'from' + body.name,
		message: body.messageId,
		html: '<b>'+body.messageId+'<b> '
	};
	await smtpTransport.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
			res.status(400).json({});
        }else{
			if (info) {
				console.log('Message sent: %s', info.messageId);
				res.status(200).json({});
			}else{
				res.status(401).json({});
			}
		}

	
});	


})


export default router;


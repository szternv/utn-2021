import { Router } from "express";

var nodemailer = require('nodemailer');


const router = Router();

var smtpTransport = nodemailer.createTransport("smtps://englishmadeasy21%40gmail.com:"+encodeURIComponent('gatopancho21') + "@smtp.gmail.com:465"); 


router.post("/", (req, res)=>{
	var body = req.body
	
	console.table(req.body);

	var mailOptions = {
		from: body.email,
		to: 'englishmadeasy21@gmail.com',
		subject: 'Consulta ' + 'from ' + body.name,
		message: body.message,
		html: ' '
	};
	smtpTransport.sendMail(mailOptions, (error, info) => {
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


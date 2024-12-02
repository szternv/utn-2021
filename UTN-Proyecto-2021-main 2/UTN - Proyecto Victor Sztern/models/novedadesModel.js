
var express = require('express');
var router = express.Router();
var connection  = require('./bd');

router.get('/novedades', function(req, res, next) {
      
    connection.query('SELECT * FROM novedades',function(err,rows)     {
    
           if(err){
            req.flash('error', err); 
            res.render('list',{page_title:"novedades",data:''});   
           }else{
               
               res.render('list',{page_title:"novedades",data:rows});
           }
                               
            });
           
       });
    
    
module.exports = router;
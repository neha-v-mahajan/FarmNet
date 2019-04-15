var express = require('express');
var mongoose=require('mongoose');
var  bodyParser = require('body-parser');
const multer= require('multer');
const session = require('express-session');
var app = express();

app.use(bodyParser.urlencoded({extended:true}));
const post= require('./Model/innovations');
const expert= require('./Model/experts');
const official=require('./Model/official');
const admins=require('./Model/admins');

app.use(bodyParser.json());

app.use(session({
	secret: 'abc'
}))

app.use(express.static('public'));
app.set('view engine','ejs');
mongoose.connect('mongodb+srv://neha:neha@cluster0-3pcxv.mongodb.net/FarmNet?retryWrites=true',{ useNewUrlParser: true});

const storage = multer.diskStorage({
	destination : './public/uploads',
	filename: function(req, file, callback) {
		callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
	}
});

const upload = multer({
   storage: storage
}).single('image');

app.post('/rregister',(req,res)=>{
   // var img;
	// upload(req,res,(err)=>{
	// 	 if(err){
	// 		res.send(err);
	// 	}
	// 	else{
		//	req.body.owner=req.session.user;
			//req.body.image=req.file.mimetype;
			var data= new official(req.body);
			data.save(function(err){
				if(err) res.send(err);
				else{
						res.render('./admin/addofficial');
					 }
			})
		
	});

app.post('/eregister',(req,res)=>{
	// var img;
	//  upload(req,res,(err)=>{
	// 	  if(err){
	// 		 res.send(err);
	// 	 }
	// 	 else{
	// 		req.body.profile=req.file.filename;
			var data= new expert(req.body);
			data.save(function(err){
			if(err) res.send(err);
			else{
					res.render('./admin/addexpert');
				}
			})
		
	});
app.get('/delete/:usnm',(req,res)=>{
	if(req.session.user){
		var user = req.session.user;  
		const usnm = req.params.usnm;
		//console.log(usnm);
		// post.findOne({title: usnm},(err,data)=>{
		// 	if(data){
				post.deleteOne({title: usnm},(err,data)=>{
					if(data){
						res.render('./admin/');
					}

				});
				
			}
		
	else{
		var resp =`
		<script> alert('log in first');window.location.href='/admin/login';</script>
		`;
		res.send(resp);   
	}
		
	});

app.get('/detail/:name',(req,res)=>{
if(req.session.user){
	var user = req.session.user;  
	const usnm = req.params.name;
	//console.log(usnm);
	post.findOne({title: usnm},(err,data)=>{
		if(data){
			res.render('./admin/single-post',{post:data,expert:user});
		}
	})
}
else{
	var resp =`
	<script> alert('log in first');window.location.href='/admin/login';</script>
	`;
	res.send(resp);   
}
	
});

app.post('/clogin',(req,res)=>{
	const usnm = req.body.username;
	console.log(usnm);
	const passwd= req.body.password;
	admins.findOne({'username': usnm},(err,data)=>{
		if(data){
			req.session.user = data;
			res.redirect('/admin/addofficial');
		}
		else{
			var resp =`
        <script> alert('login Incorrect!');window.location.href='/admin/login';</script>
        `;
        res.send(resp);
		}
	})
});

app.get('/logout',(req,res)=>{
    
    if(req.session.user){
        req.session.destroy((err,data)=>{
            if(err) console.log(err);
            else{
                var succ =`
                <script> alert('successfully logged out');window.location.href='/admin/login';</script>
                `;
                res.send(succ);
            }
        
    });
}
    else{
        var resp =`
        <script> alert('log in first');window.location.href='/admin/login';</script>
        `;
        res.send(resp);
    }
});

app.get('/login',(req,res)=>{
	res.render('./admin/login');
	
})
.get('/addofficial',(req,res)=>{
	if(req.session.user){
        var user = req.session.user;  
        res.render('./admin/addofficial');
    }
    else{
        var resp =`
        <script> alert('log in first');window.location.href='/admin/login';</script>
        `;
        res.send(resp);   
	}
   
}).get('/addexpert',(req,res)=>{
	if(req.session.user){
        var user = req.session.user;  
        res.render('./admin/addexpert');
    }
    else{
        var resp =`
        <script> alert('log in first');window.location.href='/admin/login';</script>
        `;
        res.send(resp);   
	}
   
}).get('/post/:number',(req,res)=>{
	if(req.session.user){
		var user = req.session.user; 
		res.send(req.params.number); 
    }
    else{
        var resp =`
        <script> alert('log in first');window.location.href='/admin/login';</script>
        `;
        res.send(resp);   
	}
 
 
}).get('/',(req,res)=>{
	if(req.session.user){
		var user = req.session.user;
		post.findOne({},(err,data)=>{
			if(data){
				res.render('./admin/index',{post:data});
			}
		});
    }
    else{
        var resp =`
        <script> alert('log in first');window.location.href='/admin/login';</script>
        `;
        res.send(resp);   
	}
	
});

module.exports = app;
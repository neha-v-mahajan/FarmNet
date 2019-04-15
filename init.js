var express = require('express');
var app = express();
var route=require('./expert');
var route2=require('./official');
var route3=require('./admin');

app.set('view engine','ejs');
app.set('views','./views')

app.use(express.static('static'));
app.use('/expert',route);
app.use('/official',route2);
app.use('/admin',route3);
app.get('/',(req,res)=>{
    res.render('index')
}).get('/single-post',(req,res)=>{
    res.render('single-post')
}).get('/blog',(req,res)=>{
    res.render('blog')
}).get('/index',(req,res)=>{
    res.render('index')
}).get('/newInnovation',(req,res)=>{
    res.render('newInnovation');
});

app.listen(8080);
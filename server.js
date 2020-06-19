var express=require('express');
var hbs=require('hbs');
var app=express();
var fs=require('fs');

hbs.registerPartials(__dirname+'/views/partials');

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('Cap',function(k){
    console.log(k);
    if(typeof(text)=='undefined')
        {
        console.log('Yippe!');
        }
    else    
        {
        return k.toUpperCase();
        }
});

app.use((req,res,next)=>{
    var newLogTime=new Date().toDateString();
    var log=`Time:${newLogTime}/ ${req.method}/${req.url}`;
    fs.appendFile('logs.log',log+'\n',(err)=>{
        if(err=null)
            {
            console.log('Some error has occured');
            }
    });
    console.log(log);
    next();
});

var flag=1;
app.use((req,res,next)=>{
    if(flag==1)
        {
        res.render('Maintainence.hbs');
        }
    else    
        {
        next();
        }
});

app.set('view engine','hbs');
app.get('/',(req,res)=>{
    res.send({
        Name:'Sowmith Nandan',

    });
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        Something:'Something Something',
        // CurrentYear:new Date().getFullYear()
    });
});

app.get('/about/bad',(req,res)=>{
    res.render('about-bad.hbs',{
        ErrorMessage:'Something went wrong',
        // CurrentYear:new Date().getFullYear()
    });
});

app.listen(3000);

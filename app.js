const express=require('express');
const bodyParser=require('body-parser');
const app=express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
var items=['Buy Food','Cook Food','Eat Food'];
var workItems=[];
app.get('/',function(req,res){
    var options = { weekday: 'long',day: 'numeric', month: 'long' };
    var today  = new Date();
    
    // console.log(today.toLocaleDateString("en-US")); // 9/17/2016
    var day=today.toLocaleDateString("en-US", options);
    // console.log(today.toLocaleDateString("en-US", options)); // Saturday, September 17, 2016

    res.render('list', {listTitle: day, newListItems: items });



// var today=new Date();
// var currentDay=today.getDay();
// var day="";
// const arr=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
// day=arr[currentDay];


// res.render('list', {kindOfDay: day});

// res.sendFile(__dirname+'/index.html');

});


app.post('/',function(req,res){
    var item=req.body.newItem;
    if(req.body.list==="work"){
        workItems.push(item);
res.redirect('/work');

    }
    else{
        items.push(item);
        res.redirect('/');
    }

});

app.get('/work',function(req,res){
res.render('list',{listTitle:"workList",newListItems:workItems});
});

app.post('/work',function(req,res){
var item=req.body.newItem;
workItems.push(item);
res.redirect('/work');
});
app.get('/about',function(req,res){
    res.render('about');
})

app.listen(3000,function(){
    console.log("Server started at port 3000");
})
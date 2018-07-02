const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log + '\n', (err)=>{
    if(err){
      console.log('Unable to log file');
    }
  });
  next();
});

// app.use((req, res, next)=> {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase();
});

app.get('/home', (req, res) =>{
  // res.send('<h1>Hello express!</h1>');
  // res.send({
  //   name: 'Aditya',
  //   likes:['walking',
  //         'Read']
  // });
  res.render('home.hbs',{
    pageTitle: "You're at home!",
    pageParagraph: 'Welcome to NodeJS World!'
  });
});

app.get('/about',(req, res)=>{
  res.render('about.hbs',{
    pageTitle: 'About Page'
  });
});

app.get('/bad',(req, res)=>{
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(3000, ()=>{
  console.log('Server is open on port 3000');
});

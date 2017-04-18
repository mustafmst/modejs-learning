const express = require('express');
const hbs = require('hbs');
var app = express();

app.set('view engine', 'hbs');
app.use(express.static(__dirname+'/public'));

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    year: new Date().getFullYear(),
    welcomeMessage: 'Witaj na stronie domowej!'
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    year: new Date().getFullYear()
  });
});

app.get('/bad',(req,res) => {
  res.send({
    errorMessage: 'Woops! Coś się zjebało :P'
  });
});

app.listen(3000, () => {
  console.log()
});

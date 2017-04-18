const express = require('express');

var app = express();

app.get('/', (req, res) => {
  //res.send('<h1>Hello Express!</h1>');
  res.send({
    name: 'Pawel',
    likes:[
      'snowboard',
      'programming'
    ]
  });
});

app.get('/about', (req, res) => {
  res.send('About page!');
});

app.get('/bad',(req,res) => {
  res.send({
    errorMessage: 'Woops! Coś się zjebało :P'
  });
});

app.listen(3000);

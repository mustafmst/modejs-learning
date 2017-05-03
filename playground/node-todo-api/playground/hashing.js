const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var pass = 'pawel1';

//bcrypt.genSalt(10, (err, salt) => {
//  bcrypt.hash(pass, salt, (err, hash) => {
//    console.log(hash);
//  })
//});

var hashedPass = '$2a$10$I24kT/YG13drG6Q50Qsr4.z6T56RBehw5qb6n6pTBZ/rJ4zvX.Bva';

bcrypt.compare(pass, hashedPass, (err, res) => {
  console.log(res);
});

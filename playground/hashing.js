const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
  id: 4
};

var token = jwt.sign(data, 'dupa');
console.log(token);
var decoded = jwt.verify(token, 'dupa');
console.log(decoded);

//var message = 'ugabuga1';
//var hash = SHA256(message).toString();
//
//console.log(message + " : " + hash);
//
//
//var data = {
//  id: 4
//};
//
//var token = {
//  data,
//  hash: SHA256(JSON.stringify(data)+'dupa').toString()
//};
//
//token.data.id = 5;
//token.hash = SHA256(JSON.stringify(data)).toString()
//
//
//var resultHash = SHA256(JSON.stringify(token.data)+'dupa').toString();
//if(resultHash === token.hash){
//  console.log('Data was not change');
//} else {
//  console.log('Data was changed');
//}

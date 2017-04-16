//var somePromise = new Promise((resolve, reject) => {
//  setTimeout(() => {
//    resolve('Hey. It worked!');
//    // reject('Unable to fulfill promise');
//  }, 2500);
//});
//
//somePromise.then((message) => {
//  console.log('Success: ', message);
//}, (errorMessage) => {
//  console.log('Error: ', errorMessage);
//});

var somePromise = new Promise((resolve, reject) =>{
  setTimeout(() => {
    resolve('Hey. It worked!');
    reject('unable to fulfill promise.');
  }, 2500);
});

somePromise.then((message)=>{
  console.log('Success: '+ message);
}, (errorMessage) => {
  console.log('Error: '+errorMessage);
});

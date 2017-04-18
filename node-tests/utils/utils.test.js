const utils = require('./utils');

it('should add two numbers', () => {
  var res = utils.add(3,4);
  
  if(res !== 7){
    throw new Error(`Expected 7 but was ${res}`);
  }
});

it('should square number', () => {
  var res = utils.square(10);

  if(res !== 100){
    throw new Error(`Expected 100 but was ${res}`);
  }
});

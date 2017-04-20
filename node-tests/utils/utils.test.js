const utils = require('./utils');
const expect = require('expect');

it('should add two numbers', () => {
  var res = utils.add(3,4);
  expect(res).toExist().toBeA('number').toBe(7);
});

it('should async add two numbers', (done) => {
  utils.asyncAdd(3,4,(sum) => {
    expect(sum).toBeA('number').toBe(7);
    done();
  });
});

it('should square a number', () => {
  var res = utils.square(10);
  expect(res).toExist().toBeA('number').toBe(100);
});

it('should async square a number', (done) => {
  utils.asyncSquare(3, (square) => {
    expect(square).toBeA('number').toBe(9);
    done();
  });
});

it('shoult expect some values', () => {
  expect(12).toNotBe(9);
  expect({name: "Pawel"}).toNotEqual({name:"pawel"});
  expect([2,3,4]).toExclude(5);
  expect({
    name: 'Pawel',
    age: 24,
    location: 'Krakow'
  }).toInclude({
    age: 24
  });
});

it('should return valid user object', () => {
  var user = utils.setName({}, "Paweł Mstowski");
  expect(user)
    .toBeA('object')
    .toInclude({firstName: "Paweł"})
    .toInclude({lastName: "Mstowski"});
});

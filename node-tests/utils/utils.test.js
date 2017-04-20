const utils = require('./utils');
const expect = require('expect');

it('should add two numbers', () => {
  var res = utils.add(3,4);

  expect(res).toExist().toBeA('number').toBe(7);
});

it('should square a number', () => {
  var res = utils.square(10);

  expect(res).toExist().toBeA('number').toBe(100);
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

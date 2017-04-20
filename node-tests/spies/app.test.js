const expect = require('expect');
const rewire = require('rewire');

var app = rewire('./app.js');


describe('App', () => {
  var db = {
    saveUser: expect.createSpy()
  };
  app.__set__('db', db);

  it('should call the spy correctly', () => {
    var spy = expect.createSpy();
    spy('Paweł', 24);
    expect(spy).toHaveBeenCalledWith('Paweł', 24);
  });

  it('should call saveUser with user object', () => {
    var email = "pawel.mstowski@gmail.com";
    var password = "1234rewq";

    app.handleSignup(email, password);

    expect(db.saveUser).toHaveBeenCalledWith({email: email, password: password});
  });
});

var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./../server/utils/message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = "testUser";
    var text = "Test Message";

    var message = generateMessage(from,text);

    expect(message).toExist();
    expect(message.createdAt).toExist().toBeA('number');
    expect(message.from).toBe(from);
    expect(message.text).toBe(text);
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location message', () => {
    var from = 'testUser';
    var lat = 50;
    var lng = 19;

    var message = generateLocationMessage(from,lat,lng);

    expect(message.createdAt).toExist().toBeA('number');
    expect(message.from).toBe(from);
    expect(message.url).toBe(`https://www.google.pl/maps?q=${lat},${lng}`);
  });
});

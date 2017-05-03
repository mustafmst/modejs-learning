var expect = require('expect');

var {generateMessage} = require('./../server/utils/message');

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

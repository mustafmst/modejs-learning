const expect = require('expect');

const {isRealString} = require('./../server/utils/validation');

describe('Validation.js tests', () => {
  it('should return false if empty string is provided', () => {
    var testString = "";
    var res = isRealString(testString);
    expect(res).toBe(false);
  });

  it('should return false if string with only white signs is provided', () => {
    var testString = "    ";
    var res = isRealString(testString);
    expect(res).toBe(false);
  });

  it('should return true if valid string is provided', () => {
    var testString = "test String";
    var res = isRealString(testString);
    expect(res).toBe(true);
  });

  it('should return false if a non-string is provided', () => {
    var testString = 23;
    var res = isRealString(testString);
    expect(res).toBe(false);
  });
})

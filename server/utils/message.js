var moment = require('moment');

var generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: moment().valueOf()
  };
};

var generateLocationMessage = (from, lat, lng) => {
  return {
    from,
    url: `https://www.google.pl/maps?q=${lat},${lng}`,
    createdAt: moment().valueOf()
  };
};

module.exports = {
  generateMessage,
  generateLocationMessage
};

module.exports.add = (a,b) => {
  return a+b;
};

module.exports.square = (x) => {
  return x*x;
};

module.exports.setName = (user, fullName) => {
  var names = fullName.split(' ');
  user.firstName = names[0];
  user.lastName = names[1];
  return user;
};

const expect = require('expect');

const {Users} = require('./../server/utils/users');

describe('Users class', () => {
  var users;

  beforeEach(() => {
    users = new Users();

    users.users = [{
      id: '1',
      name: 'Pawel',
      room: 'A'
    },{
      id: '2',
      name: 'michal',
      room: 'A'
    },{
      id: '3',
      name: 'Jacek',
      room: 'B'
    }];
  });


  it('should add new User', () => {
    var user = {
      id: '4',
      name: 'Ania',
      room: 'A'
    }
    users.addUser(user.id, user.name, user.room);
    expect(users.users).toInclude(user);
  });

  it('should return users for room', () => {
    var usersInRoom = users.getUserList('B');
    expect(usersInRoom).toEqual(['Jacek']);
  });

  it('should remove user', () => {
    var length = users.users.length;
    users.removeUser(1);
    expect(users).toNotInclude({id: '1',
    name: 'Pawel',
    room: 'A'});
    expect(users.users.length).toBe(length-1);
  });

  it('should not delete the user', () => {
    var length = users.users.length;
    users.removeUser(4);
    expect(users.users.length).toBe(length);
  });

  it('should find user', () => {
    var user = users.getUser('1');
    expect(user).toEqual({
      id: '1',
      name: 'Pawel',
      room: 'A'
    });
  });
});

// class Person {
//   constructor(id, name, room) {
//     this.id = id;
//     this.name = name;
//     this.room = room;
//   }
//
//   getUserDescription() {
//     return `${this.id} | ${this.name} | ${this.room}`;
//   }
// }
//
// var me = new Person('gf53ybtwy5', 'Pawel', 'dupa');
//
// console.log(me.getUserDescription());

class Users {
  constructor(){
    this.users = [];
  }

  addUser(id, name, room) {
    var user = {id,name,room};
    this.users.push(user);
    return user;
  }

  getUser(id) {
    return this.users.filter((user) => {
      return user.id === id;
    })[0];
  }

  removeUser(id) {
    var user = this.getUser(id);
    this.users = this.users.filter((user) => {
      return user.id != id;
    });
    return user;
  }

  getUserList(room){
    var users = this.users.filter((user) => {
      return user.room === room;
    });
    var names = users.map((user) => {
      return user.name;
    });
    return names;
  }
}

module.exports = {
  Users
}

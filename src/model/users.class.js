import User from './user.class.js';

export default class Users {
  constructor(data = []) {
    this.populate(data);
  }

  populate(data) {
    this.data = data.map(d => new User(d.id, d.nick, d.email, d.password));
  }

  addUser(user) {
    const newId = this.data.length > 0 ? Math.max(...this.data.map(u => u.id)) + 1 : 1;
    const newUser = new User(newId, user.nick, user.email, user.password);
    this.data.push(newUser);
    return newUser;
  }

  removeUser(id) {
    const index = this.getUserIndexById(id);
    return this.data.splice(index, 1)[0];
  }

  changeUser(user) {
    const index = this.getUserIndexById(user.id);
    this.data[index] = new User(user.id, user.nick, user.email, user.password);
    return this.data[index];
  }

  getUserById(id) {
    const user = this.data.find(u => u.id === id);
    if (!user) throw new Error(`User with id ${id} not found`);
    return user;
  }

  getUserIndexById(id) {
    const index = this.data.findIndex(u => u.id === id);
    if (index === -1) throw new Error(`User with id ${id} not found`);
    return index;
  }

  getUserByNickName(nick) {
    const user = this.data.find(u => u.nick === nick);
    if (!user) throw new Error(`User with nick ${nick} not found`);
    return user;
  }

  toString() {
    return this.data.map(u => u.toString()).join('\n');
  }
}

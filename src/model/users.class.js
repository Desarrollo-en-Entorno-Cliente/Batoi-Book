import User from './user.class.js';
import * as api from '../services/users.api.js';

export default class Users {
  constructor() {
    this.data = [];
  }

  // Carga todos los usuarios desde la API
  async populate() {
    const users = await api.getDBUsers();
    this.data = users.map(u => new User(u.id, u.nick, u.email, u.password));
  }

  // Añade un usuario
  async addUser(user) {
    const newUserData = await api.addDBUser(user);
    const userInstance = new User(newUserData.id, newUserData.nick, newUserData.email, newUserData.password);
    this.data.push(userInstance);
    return userInstance;
  }

  // Elimina un usuario
  async removeUser(id) {
    const user = this.getUserById(id); // Lanza error si no existe
    await api.removeDBUser(id);
    this.data = this.data.filter(u => u.id !== id);
    return user;
  }

  // Modifica un usuario
  async changeUser(user) {
    const _ = this.getUserById(user.id); // Lanza error si no existe
    const updatedData = await api.changeDBUser(user);
    const updatedUser = new User(updatedData.id, updatedData.nick, updatedData.email, updatedData.password);
    const index = this.getUserIndexById(user.id);
    this.data[index] = updatedUser;
    return updatedUser;
  }

  // Cambia solo la contraseña
  async changeUserPassword(id, newPassword) {
    const _ = this.getUserById(id); // Lanza error si no existe
    const updatedData = await api.changeDBUserPassword(id, newPassword);
    const index = this.getUserIndexById(id);
    this.data[index].password = updatedData.password;
    return this.data[index];
  }

  // Métodos de consulta
  async getUserById(id) {
    if (!id) throw new Error("User ID is required");
    const user = await api.getDBUser(id);
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

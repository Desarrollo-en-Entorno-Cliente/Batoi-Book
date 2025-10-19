import Book from './book.class.js';
import * as api from '../services/books.api.js';

export default class Books {
  constructor() {
    this.data = [];
  }

  // Carga todos los libros desde la API
  async populate() {
    const books = await api.getDBBooks();
    this.data = books.map(b => new Book(b));
  }

  // Añade un libro
  async addBook(book) {
    const newBookData = await api.addDBBook(book);
    const bookInstance = new Book(newBookData);
    this.data.push(bookInstance);
    return bookInstance;
  }

  // Elimina un libro
  async removeBook(id) {
    const book = this.getBookById(id); // Lanza error si no existe
    await api.removeDBBook(id);
    this.data = this.data.filter(b => b.id !== id);
    return book;
  }

  // Modifica un libro
  async changeBook(book) {
    const _ = this.getBookById(book.id); // Lanza error si no existe
    const updatedData = await api.changeDBBook(book);
    const updatedBook = new Book(updatedData);
    const index = this.getBookIndexById(book.id);
    this.data[index] = updatedBook;
    return updatedBook;
  }

  // Métodos de consulta
  getBookById(id) {
    const book = this.data.find(b => b.id === id);
    if (!book) throw new Error(`Book with id ${id} not found`);
    return book;
  }

  getBookIndexById(id) {
    const index = this.data.findIndex(b => b.id === id);
    if (index === -1) throw new Error(`Book with id ${id} not found`);
    return index;
  }

  bookExists(userId, moduleCode) {
    return this.data.some(b => b.userId === userId && b.moduleCode === moduleCode);
  }

  booksFromUser(userId) {
    return this.data.filter(b => b.userId === userId);
  }

  booksFromModule(moduleCode) {
    return this.data.filter(b => b.moduleCode === moduleCode);
  }

  booksCheeperThan(price) {
    return this.data.filter(b => b.price <= price);
  }

  booksWithStatus(status) {
    return this.data.filter(b => b.status === status);
  }

  averagePriceOfBooks() {
    if (this.data.length === 0) return '0.00 €';
    const total = this.data.reduce((acc, b) => acc + b.price, 0);
    return `${(total / this.data.length).toFixed(2)} €`;
  }

  booksOfTypeNotes() {
    return this.data.filter(book => book.publisher === 'Apunts');
  }

  booksNotSold() {
    return this.data.filter(book => !book.soldDate || book.soldDate === '');
  }

  toString() {
    return this.data.map(b => b.toString()).join('\n');
  }
}

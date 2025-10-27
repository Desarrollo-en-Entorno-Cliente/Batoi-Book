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
    const maxId = this.data.length ? Math.max(...this.data.map(b => b.id)) : 0;
    const bookWithId = { ...book, id: maxId + 1 };
    const newBookData = await api.addDBBook(bookWithId);
    const bookInstance = new Book(newBookData);
    this.data.push(bookInstance);
    return bookInstance;
  }

   // Elimina un libro
  async removeBook(id) {
    const index = this.getBookIndexById(id); // Lanza error si no existe
    const book = this.data[index];           // Obtenemos el libro directamente
    await api.removeDBBook(id);
    this.data.splice(index, 1);              // Eliminamos del array
    return book;
  }

  // Modifica un libro
  async changeBook(book) {
    const index = this.getBookIndexById(book.id); // Lanza error si no existe
    const updatedData = await api.changeDBBook(book);
    const updatedBook = new Book(updatedData);
    this.data[index] = updatedBook;              // Reemplazamos directamente
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

import Book from './book.class.js';

export default class Books {
  constructor(data = []) {
    this.populate(data);
  }

  populate(data) {
    this.data = data.map(d => new Book(d));
  }

  addBook(book) {
    const newId = this.data.length > 0 ? Math.max(...this.data.map(b => b.id)) + 1 : 1;
    const newBook = new Book({ ...book, id: newId });
    this.data.push(newBook);
    return newBook;
  }

  removeBook(id) {
    const index = this.getBookIndexById(id);
    return this.data.splice(index, 1)[0];
  }

  changeBook(book) {
    const index = this.getBookIndexById(book.id);
    this.data[index] = new Book(book);
    return this.data[index];
  }

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

  incrementPriceOfbooks(percentage) {
    return this.data = this.data.map(b => {b.price = +(b.price * (1 + percentage)).toFixed(1); return b});
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

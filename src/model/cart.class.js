import Book from './book.class.js';

export default class Cart {
  constructor() {
    this.data = [];
  }

  /**
   * (Por ahora no hace nada, pero podría cargar un carrito guardado)
   */
  populate() {
    // En un futuro, podría cargar desde localStorage
    console.log("Carrito inicializado.");
  }

  /**
   * Devuelve un libro del carrito por su ID
   * @param {string} id - El ID del libro a buscar
   * @returns {Book | undefined} El libro si se encuentra, o undefined si no.
   */
  getBookById(id) {
    return this.data.find(book => book.id === id);
  }

  /**
   * Añade una copia de un libro al carrito.
   * Lanza un error si el libro ya existe en el carrito.
   * @param {Book} book - El objeto libro a añadir
   */
  addItem(book) {
    if (this.getBookById(book.id)) {
      throw new Error(`El libro con ID ${book.id} ya está en el carrito.`);
    }
    // Añadimos una copia para evitar mutaciones del objeto original
    const bookCopy = new Book(book); 
    this.data.push(bookCopy);
    console.log("Libro añadido al carrito:", bookCopy);
  }

  /**
   * Elimina un libro del carrito por su ID.
   * Lanza un error si el libro no se encuentra.
   * @param {string} id - El ID del libro a eliminar
   */
  removeItem(id) {
    const index = this.data.findIndex(book => book.id === id);
    if (index === -1) {
      throw new Error(`El libro con ID ${id} no se encuentra en el carrito.`);
    }
    this.data.splice(index, 1);
    console.log(`Libro con ID ${id} eliminado del carrito.`);
  }

  /**
   * Devuelve un string con la información de los libros del carrito.
   */
  toString() {
    if (this.data.length === 0) {
      return "El carrito está vacío.";
    }
    return this.data.map(b => b.toString()).join('\n');
  }
}
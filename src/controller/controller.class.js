import View from "../view/view.class.js";
import Books from "../model/books.class.js";
import Modules from "../model/modules.class.js";
import Cart from "../model/cart.class.js";

export default class Controller {
  constructor() {
    this.view = new View();
    this.books = new Books();
    this.modules = new Modules();
    this.cart = new Cart();
  }

  async init() {
    try {
      // Esperamos a que libros, módulos y carrito se inicialicen
      await Promise.all([
        this.modules.populate(), 
        this.books.populate(),
        this.cart.populate()
      ]);

      this.view.renderModules(this.modules.data);
      
      const getModuleCliteral = (code) => {
        try {
          return this.modules.getModuleByCode(code).cliteral;
        } catch (e) {
          console.warn(`(Desde el Controller) ${e.message}`);
          return `Módulo ${code}`;
        }
      };

      this.view.renderBooks(this.books.data, getModuleCliteral);

      // Configuramos los manejadores (handlers)
      this.view.setBookSubmitHandler((payload) => this.handleSubmitBook(payload));
      
      // Vinculamos las acciones de las tarjetas (delegación de eventos)
      this.view.bindCardActions(
        (id) => this.handleAddToCart(id),
        (id) => this.handleEditBook(id),
        (id) => this.handleDeleteBook(id)
      );
      
    } catch (error) {
      this.view.showMessage("error", `Error cargando los datos: ${error.message}`);
    }
  }

  /**
   * Maneja el envío del formulario (tanto para añadir como para editar).
   */
  async handleSubmitBook(payload) {
    try {
      // Asignamos el userId (hardcodeado a 2 según la solicitud)
      const userId = 2; 

      const processedPayload = {
        ...payload,
        price: parseFloat(payload.price) || 0,
        pages: parseInt(payload.pages, 10) || 0,
        userId: payload.userId || userId, // Usa el userId existente o el nuevo
      };

      if (payload.id) {
        const updatedBook = await this.books.changeBook(processedPayload);
        
        // Obtenemos el cliteral aquí, en el controlador
        const cliteral = this.modules.getModuleByCode(updatedBook.moduleCode).cliteral;
        
        // Pasamos el string cliteral a la vista, no el objeto 'modules'
        this.view.updateBook(updatedBook, cliteral); 
        this.view.showMessage("info", "Libro modificado con éxito");

      } else {

        const newBook = await this.books.addBook(processedPayload);

        // Obtenemos el cliteral aquí, en el controlador
        const cliteral = this.modules.getModuleByCode(newBook.moduleCode).cliteral;

        // Pasamos el string cliteral a la vista, no el objeto 'modules'
        this.view.renderBook(newBook, cliteral); 
        this.view.showMessage("info", "Libro añadido con éxito");
      }
    } catch (error) {
      this.view.showMessage("error", `Error: ${error.message}`);
    }
  }

  /**
   * Maneja el clic en el icono de eliminar.
   */
  async handleDeleteBook(id) {
    try {
      // Obtenemos el nombre del módulo aquí para el 'confirm'
      const book = this.books.getBookById(id);
      const moduleCliteral = this.modules.getModuleByCode(book.moduleCode).cliteral;
      
      // Pedimos confirmación al usuario
      const confirmed = window.confirm(
        `¿Estás seguro de que quieres borrar el libro "${moduleCliteral}" (ID: ${id})?`
      );
      
      if (!confirmed) return; // Si el usuario cancela, no hacemos nada

      const numericId = id; 
      await this.books.removeBook(numericId); 
      this.view.removeBook(numericId); 
      this.view.showMessage("info", "Libro eliminado con éxito");
    } catch (error) {
      this.view.showMessage("error", `Error: ${error.message}`);
    }
  }

  /**
   * Maneja el clic en el icono de editar.
   */
  handleEditBook(id) {
    try {
      const book = this.books.getBookById(id);
      this.view.prepareFormForEdit(book);
    } catch (error) {
      this.view.showMessage("error", `Error: ${error.message}`);
    }
  }

  /**
   * Maneja el clic en el icono de añadir al carrito.
   */
  handleAddToCart(id) {
    try {
      const book = this.books.getBookById(id);
      this.cart.addItem(book);
      
      // REFACTOR: Obtenemos el nombre del módulo aquí para el mensaje
      const moduleCliteral = this.modules.getModuleByCode(book.moduleCode).cliteral;
      
      this.view.showMessage("info", `Libro "${moduleCliteral}" añadido al carrito.`);
      console.log("Estado del carrito:", this.cart.toString());
    } catch (error) {
      this.view.showMessage("error", `Error: ${error.message}`);
    }
  }
}
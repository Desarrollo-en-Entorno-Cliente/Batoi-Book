import View from "../view/view.class.js";
import Books from "../model/books.class.js";
import Modules from "../model/modules.class.js";

export default class Controller {
  constructor() {
    this.view = new View();
    this.books = new Books();
    this.modules = new Modules();
  }

  async init() {
    try {
      await Promise.all([this.modules.populate(), this.books.populate()]);

      this.view.renderModules(this.modules.data);
      this.view.renderBooks(this.books.data, this.modules);

      this.view.setBookSubmitHandler((payload) => this.handleSubmitBook(payload));
      this.view.setBookRemoveHandler((id) => this.handleRemoveBook(id));
    } catch (error) {
      this.view.showMessage("error", `Error cargando los datos: ${error.message}`);
    }
  }

  async handleSubmitBook(payload) {
    try {
      const processedPayload = {
        ...payload,
        price: parseFloat(payload.price) || 0,
        pages: parseInt(payload.pages, 10) || 0,
        userId: 1, // Se añade un userId por defecto para la API
      };
      const newBook = await this.books.addBook(processedPayload);
      this.view.renderBook(newBook, this.modules);
      this.view.showMessage("info", "Libro añadido con éxito");
    } catch (error) {
      this.view.showMessage("error", `Error: ${error.message}`);
    }
  }

  async handleRemoveBook(id) {
    try {
      const numericId = parseInt(id, 10);
      if (isNaN(numericId)) throw new Error("ID no válido");

      await this.books.removeBook(numericId);
      this.view.removeBook(numericId);
      this.view.showMessage("info", "Libro eliminado con éxito");
    } catch (error) {
      this.view.showMessage("error", `Error: ${error.message}`);
    }
  }
}
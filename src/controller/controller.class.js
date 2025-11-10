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
    this.userId = 2; // Usuario actual (fijo para este ejemplo)
  }

  async init() {
    try {
      // Cargar datos iniciales
      await Promise.all([
        this.modules.populate(),
        this.books.populate(),
        this.cart.populate(),
      ]);

      // Renderizar módulos en el select
      this.view.renderModules(this.modules.data);

      // Detectar cambios en el select de módulo
      this.view.setModuleChangeHandler((selectedModule) =>
        this.handleModuleChange(selectedModule)
      );

      // Mostrar los libros ya existentes
      const getModuleCliteral = (code) => {
        try {
          return this.modules.getModuleByCode(code).cliteral;
        } catch {
          return `Módulo ${code}`;
        }
      };
      this.view.renderBooks(this.books.data, getModuleCliteral);

      // Configurar eventos del formulario
      this.view.setBookSubmitHandler((payload) =>
        this.handleSubmitBook(payload)
      );

      // Configurar acciones de las tarjetas
      this.view.bindCardActions(
        (id) => this.handleAddToCart(id),
        (id) => this.handleEditBook(id),
        (id) => this.handleDeleteBook(id)
      );
    } catch (error) {
      this.view.showMessage("error", `Error cargando datos: ${error.message}`);
    }
  }

  /**
   * Validación al cambiar el módulo
   */
  async handleModuleChange(selectedModule) {
    const userId = this.userId;

    if (!selectedModule) {
      this.view.clearFieldError("moduleCode");
      return;
    }

    try {
      const exists = await this.books.bookExists(userId, selectedModule);
      console.log("¿Existe el libro?", exists);

      if (exists) {
        this.view.showFieldError(
          "moduleCode",
          "Ya has añadido un libro de este módulo."
        );
      } else {
        this.view.clearFieldError("moduleCode");
      }
    } catch (error) {
      console.error("Error comprobando módulo:", error);
      this.view.showFieldError("moduleCode", "Error al comprobar el módulo.");
    }
  }

  /**
   * Envío del formulario
   */
  async handleSubmitBook(payload) {
    try {
      const userId = this.userId;
      const processedPayload = {
        ...payload,
        price: parseFloat(payload.price) || 0,
        pages: parseInt(payload.pages, 10) || 0,
        userId: payload.userId || userId,
      };

      if (payload.id) {
        // Editar libro existente
        const updatedBook = await this.books.changeBook(processedPayload);
        const cliteral = this.modules.getModuleByCode(updatedBook.moduleCode)
          .cliteral;
        this.view.updateBook(updatedBook, cliteral);
        this.view.showMessage("info", "Libro modificado con éxito");
      } else {
        // Añadir nuevo libro
        const newBook = await this.books.addBook(processedPayload);
        const cliteral = this.modules.getModuleByCode(newBook.moduleCode)
          .cliteral;
        this.view.renderBook(newBook, cliteral);
        this.view.showMessage("info", "Libro añadido con éxito");
      }
    } catch (error) {
      this.view.showMessage("error", `Error: ${error.message}`);
    }
  }

  /**
   * Eliminar libro
   */
  async handleDeleteBook(id) {
    try {
      const book = this.books.getBookById(id);
      const moduleCliteral = this.modules.getModuleByCode(book.moduleCode)
        .cliteral;
      const confirmed = window.confirm(
        `¿Seguro que quieres borrar el libro "${moduleCliteral}" (ID: ${id})?`
      );
      if (!confirmed) return;

      await this.books.removeBook(id);
      this.view.removeBook(id);
      this.view.showMessage("info", "Libro eliminado con éxito");
    } catch (error) {
      this.view.showMessage("error", `Error: ${error.message}`);
    }
  }

  /**
   * Editar libro
   */
  handleEditBook(id) {
    try {
      const book = this.books.getBookById(id);
      this.view.prepareFormForEdit(book);
      window.isEditing = true;
      window.location.hash = "#form";
    } catch (error) {
      this.view.showMessage("error", `Error: ${error.message}`);
    }
  }

  /**
   * Añadir libro al carrito
   */
  handleAddToCart(id) {
    try {
      const book = this.books.getBookById(id);
      this.cart.addItem(book);
      const moduleCliteral = this.modules.getModuleByCode(book.moduleCode)
        .cliteral;
      this.view.showMessage(
        "info",
        `Libro "${moduleCliteral}" añadido al carrito.`
      );
    } catch (error) {
      this.view.showMessage("error", `Error: ${error.message}`);
    }
  }
}

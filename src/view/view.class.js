export default class View {
  constructor() {
    this.messages = document.getElementById("messages");
    this.bookList = document.getElementById("list");
    this.form = document.getElementById("form");
    this.bookForm = document.getElementById("bookForm");
    this.about = document.getElementById("about");

    // Referencias para el formulario (Añadir/Editar)
    this.formTitle = document.getElementById("formTitle");
    this.bookIdContainer = document.getElementById("book-id-container");
    this.bookIdInput = document.getElementById("bookId");

    // Se adapta a los dos posibles IDs del select en los diferentes tests
    this.moduleSelect =
      document.getElementById("id-module") ||
      document.getElementById("moduleCode");
  }

  renderModules(modules) {
    if (!this.moduleSelect) return;
    this.moduleSelect.innerHTML = "";
    // Añadimos una opción por defecto
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Selecciona un módulo...";
    this.moduleSelect.appendChild(defaultOption);

    modules.forEach((module) => {
      const option = document.createElement("option");
      option.value = module.code;
      option.textContent = module.cliteral;
      this.moduleSelect.appendChild(option);
    });
  }

  /**
   * Renderiza un libro.
   * @param {Book} book - El objeto libro a pintar.
   * @param {string} moduleCliteral - El nombre (cliteral) del módulo.
   */
  renderBook(book, moduleCliteral) {
    // YA NO SE RECIBE 'modules'. Se recibe el string 'moduleCliteral'.

    const bookElement = document.createElement("div");
    bookElement.classList.add("card");
    bookElement.dataset.id = book.id;
    bookElement.innerHTML = `
      <div>
        <h3>${moduleCliteral} (${book.id})</h3>
        <h4>${book.publisher}</h4>
        <p>${book.pages} páginas</p>
        <p>Estado: ${book.status}</p>
        <p>${
          book.soldDate
            ? `Vendido el ${new Date(book.soldDate).toLocaleDateString()}`
            : "En venta"
        }</p>
        <p>${book.comments || ""}</p>
        <h4>
          ${book.soldDate 
              ? "Vendido" 
              : `${parseFloat(book.price).toFixed(2)} €`}
        </h4>
      </div>
      <div class="card-actions">
        <button class="icon-button" data-action="add-to-cart" data-id="${book.id}" title="Añadir al carrito">
          <span class="material-icons">add_shopping_cart</span>
        </button>
        <button class="icon-button" data-action="edit" data-id="${book.id}" title="Editar libro">
          <span class="material-icons">edit</span>
        </button>
        <button class="icon-button" data-action="delete" data-id="${book.id}" title="Eliminar libro">
          <span class="material-icons">delete</span>
        </button>
      </div>
      <br>
    `;
    if (this.bookList) {
      this.bookList.appendChild(bookElement);
    }
  }

  /**
   * Renderiza la lista completa de libros.
   * @param {Book[]} books - Array de objetos libro.
   * @param {function(string): string} getModuleCliteral - Función (proporcionada por el C.) 
   * que devuelve el cliteral de un moduleCode.
   */
  renderBooks(books, getModuleCliteral) {
    if (!this.bookList) return;
    this.bookList.innerHTML = "";
    
    // Iteramos y usamos la función 'getModuleCliteral'
    books.forEach((book) => {
      const moduleCliteral = getModuleCliteral(book.moduleCode);
      this.renderBook(book, moduleCliteral);
    });
  }

  /**
   * Actualiza el contenido de una tarjeta de libro existente en el DOM.
   * @param {Book} book - El objeto libro con los datos actualizados.
   * @param {string} moduleCliteral - El nombre (cliteral) del módulo.
   */
  updateBook(book, moduleCliteral) {
    const bookElement = this.bookList?.querySelector(`[data-id="${book.id}"]`);
    if (!bookElement) return;

    // YA NO SE RECIBE 'modules'. Se recibe el string 'moduleCliteral'.

    // Regeneramos el HTML interno del libro
    bookElement.innerHTML = `
      <div>
        <h3>${moduleCliteral} (${book.id})</h3>
        <h4>${book.publisher}</h4>
        <p>${book.pages} páginas</p>
        <p>Estado: ${book.status}</p>
        <p>${
          book.soldDate
            ? `Vendido el ${new Date(book.soldDate).toLocaleDateString()}`
            : "En venta"
        }</p>
        <p>${book.comments || ""}</p>
        <h4>
          ${book.soldDate 
              ? "Vendido" 
              : `${parseFloat(book.price).toFixed(2)} €`}
        </h4>
      </div>
      <div class="card-actions">
        <button class="icon-button" data-action="add-to-cart" data-id="${book.id}" title="Añadir al carrito">
          <span class="material-icons">add_shopping_cart</span>
        </button>
        <button class="icon-button" data-action="edit" data-id="${book.id}" title="Editar libro">
          <span class="material-icons">edit</span>
        </button>
        <button class="icon-button" data-action="delete" data-id="${book.id}" title="Eliminar libro">
          <span class="material-icons">delete</span>
        </button>
      </div>
      <br>
    `;
  }

  removeBook(bookId) {
    const bookElement = this.bookList?.querySelector(`[data-id="${bookId}"]`);
    if (bookElement) {
      bookElement.remove();
    }
  }

  showMessage(type, message) {
    if (!this.messages) return;
    const messageElement = document.createElement("div");
    messageElement.className = `_${type} alert alert-danger alert-dismissible`;
    messageElement.setAttribute("role", "alert");
    messageElement.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onclick="this.parentElement.remove()">x</button>
    `;
    this.messages.appendChild(messageElement);

    if (type !== "error") {
      setTimeout(() => {
        messageElement.remove();
      }, 3000);
    }
  }

  /**
   * Prepara el formulario para editar un libro existente.
   */
  prepareFormForEdit(book) {
    this.formTitle.textContent = "Editar libro";
    this.bookIdContainer.style.display = "block";
    this.bookIdInput.value = book.id;
    
    this.bookForm.querySelector('[id="moduleCode"]').value = book.moduleCode;
    this.bookForm.querySelector('[id="publisher"]').value = book.publisher;
    this.bookForm.querySelector('[id="price"]').value = book.price;
    this.bookForm.querySelector('[id="pages"]').value = book.pages;
    const statusRadio = this.bookForm.querySelector(`input[name="status"][value="${book.status}"]`);
    if (statusRadio) statusRadio.checked = true;
    
    this.bookForm.querySelector('[id="comments"]').value = book.comments;
    
    // Formatea la fecha para el input type="date" (YYYY-MM-DD)
    const soldDate = book.soldDate ? new Date(book.soldDate).toISOString().split('T')[0] : "";
    this.bookForm.querySelector('[id="soldDate"]').value = soldDate;

    // Mueve la vista al formulario
    this.form.scrollIntoView({ behavior: "smooth" });
  }

  /**
   * Resetea el formulario a su estado inicial (para añadir libro).
   */
  resetForm() {
    this.bookForm.reset();
    this.formTitle.textContent = "Añadir libro";
    this.bookIdContainer.style.display = "none";
    this.bookIdInput.value = "";
  }


  setBookSubmitHandler(callback) {
    if (!this.bookForm) return;
    
    this.bookForm.onsubmit = (event) => {
      event.preventDefault();

      // Comprueba si hay una ID en el campo oculto para saber si es edición o adición
      const id = this.bookIdInput.value; 

      const payload = {
        // Incluye la ID solo si existe (modo edición)
        id: id || undefined, 
        moduleCode: this.bookForm.querySelector('[id="moduleCode"]')?.value || "MOCK",
        publisher: this.bookForm.querySelector('[id="publisher"]')?.value || "Apunts",
        price: this.bookForm.querySelector('[id="price"]')?.value || "34",
        pages: this.bookForm.querySelector('[id="pages"]')?.value || "76",
        status: this.bookForm.querySelector('input[name="status"]:checked')?.value || "bad",
        comments: this.bookForm.querySelector('[id="comments"]')?.value || "Muy buen estado",
        soldDate: this.bookForm.querySelector('[id="soldDate"]')?.value || "",
      };
      
      callback(payload); // Envía los datos al controlador
      this.resetForm(); // Limpia el formulario después de enviar
    };

    // Manejador para el botón reset
    const resetButton = this.bookForm.querySelector('button[type="reset"]');
    if (resetButton) {
      resetButton.onclick = () => {
        this.resetForm();
      };
    }
  }

  /**
   * Usa delegación de eventos en la lista de libros para manejar los clics
   * en los botones de las tarjetas (Añadir carrito, Editar, Borrar).
   */
  bindCardActions(handleAddToCart, handleEdit, handleDelete) {
    if (!this.bookList) return;
    
    this.bookList.addEventListener("click", (event) => {
      // Encuentra el botón más cercano que fue pulsado
      const button = event.target.closest(".icon-button");
      
      // Si no se pulsó un botón, o no tiene data-action, no hace nada
      if (!button || !button.dataset.action) return;

      const id = button.dataset.id;
      const action = button.dataset.action;

      // Llama al callback correspondiente según la acción
      if (action === "add-to-cart") {
        handleAddToCart(id);
      } else if (action === "edit") {
        handleEdit(id);
      } else if (action === "delete") {
        handleDelete(id);
      }
    });
  }
}
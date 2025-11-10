export default class View {
  constructor() {
    this.messages = document.getElementById("messages");
    this.bookList = document.getElementById("list");
    this.form = document.getElementById("form");
    this.bookForm = document.getElementById("bookForm");
    this.about = document.getElementById("about");

    this.formTitle = document.getElementById("formTitle");
    this.bookIdContainer = document.getElementById("book-id-container");
    this.bookIdInput = document.getElementById("bookId");
    this.moduleSelect = document.getElementById("id-module") || document.getElementById("moduleCode");
  }

  renderModules(modules) {
    if (!this.moduleSelect) return;
    this.moduleSelect.innerHTML = "";

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Selecciona un módulo...";
    this.moduleSelect.appendChild(defaultOption);

    modules.forEach(module => {
      const option = document.createElement("option");
      option.value = module.code;
      option.textContent = module.cliteral;
      this.moduleSelect.appendChild(option);
    });
  }

  renderBook(book, moduleCliteral) {
    const bookElement = document.createElement("div");
    bookElement.classList.add("card");
    bookElement.dataset.id = book.id;
    bookElement.innerHTML = `
      <div>
        <h3>${moduleCliteral} (${book.id})</h3>
        <h4>${book.publisher}</h4>
        <p>${book.pages} páginas</p>
        <p>Estado: ${book.status}</p>
        <p>${book.soldDate ? `Vendido el ${new Date(book.soldDate).toLocaleDateString()}` : "En venta"}</p>
        <p>${book.comments || ""}</p>
        <h4>${book.soldDate ? "Vendido" : `${parseFloat(book.price).toFixed(2)} €`}</h4>
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

    if (this.bookList) this.bookList.appendChild(bookElement);
  }

  renderBooks(books, getModuleCliteral) {
    if (!this.bookList) return;
    this.bookList.innerHTML = "";
    books.forEach(book => {
      const moduleCliteral = getModuleCliteral(book.moduleCode);
      this.renderBook(book, moduleCliteral);
    });
  }

  updateBook(book, moduleCliteral) {
    const bookElement = this.bookList?.querySelector(`[data-id="${book.id}"]`);
    if (!bookElement) return;

    bookElement.innerHTML = `
      <div>
        <h3>${moduleCliteral} (${book.id})</h3>
        <h4>${book.publisher}</h4>
        <p>${book.pages} páginas</p>
        <p>Estado: ${book.status}</p>
        <p>${book.soldDate ? `Vendido el ${new Date(book.soldDate).toLocaleDateString()}` : "En venta"}</p>
        <p>${book.comments || ""}</p>
        <h4>${book.soldDate ? "Vendido" : `${parseFloat(book.price).toFixed(2)} €`}</h4>
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
    if (bookElement) bookElement.remove();
  }

  showMessage(type, message) {
    if (!this.messages) return;
    const messageElement = document.createElement("div");
    messageElement.className = `_${type} alert alert-dismissible`;
    messageElement.setAttribute("role", "alert");
    messageElement.innerHTML = `
      ${message} 
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onclick="this.parentElement.remove()">x</button>
    `;
    this.messages.appendChild(messageElement);

    if (type !== "error") {
      setTimeout(() => messageElement.remove(), 3000);
    }
  }

  prepareFormForEdit(book) {
    this.formTitle.textContent = "Editar libro";
    this.bookIdContainer.style.display = "block";
    this.bookIdInput.value = book.id;
    this.bookForm.querySelector('#moduleCode').value = book.moduleCode;
    this.bookForm.querySelector('#publisher').value = book.publisher;
    this.bookForm.querySelector('#price').value = book.price;
    this.bookForm.querySelector('#pages').value = book.pages;

    const statusRadio = this.bookForm.querySelector(`input[name="status"][value="${book.status}"]`);
    if (statusRadio) statusRadio.checked = true;

    this.bookForm.querySelector('#comments').value = book.comments;

    const soldDate = book.soldDate ? new Date(book.soldDate).toISOString().split('T')[0] : "";
    this.bookForm.querySelector('#soldDate').value = soldDate;

    this.form.scrollIntoView({ behavior: "smooth" });
  }

  resetForm() {
    this.bookForm.reset();
    this.formTitle.textContent = "Añadir libro";
    this.bookIdContainer.style.display = "none";
    this.bookIdInput.value = "";
  }

  setBookSubmitHandler(callback) {
    if (!this.bookForm) return;
  
    this.bookForm.addEventListener("submit", event => {
      event.preventDefault();
  
      this.bookForm.querySelectorAll(".error").forEach(el => el.textContent = "");
  
      let esValido = true;
  
      const inputs = this.bookForm.querySelectorAll("input, select, textarea");
  
      inputs.forEach(input => {
        if (input.willValidate && !input.checkValidity()) {
          esValido = false;
          let span = input.parentElement.querySelector(".error");
        if (!span) {
          span = document.createElement("span");
          span.classList.add("error");
          input.parentElement.appendChild(span);
        }
      
        const validity = input.validity;
      
        if (validity.valueMissing) {
          span.textContent = "Este campo es obligatorio";
        } else if (validity.typeMismatch) {
          span.textContent = "Formato inválido";
        } else if (validity.tooShort) {
          span.textContent = `Debe tener al menos ${input.minLength} caracteres`;
        } else if (validity.rangeUnderflow) {
          span.textContent = `Debe ser mayor o igual a ${input.min}`;
        } else if (validity.rangeOverflow) {
          span.textContent = `Debe ser menor o igual a ${input.max}`;
        } else if (validity.patternMismatch) {
          span.textContent = "El formato no coincide con el patrón requerido";
        } else {
          span.textContent = "Valor inválido";
        }
        }
      });
  
      if (!esValido) return;
  
      const id = this.bookIdInput?.value;
      const payload = {
        id: id || undefined,
        moduleCode: this.bookForm.querySelector('#moduleCode').value.trim(),
        publisher: this.bookForm.querySelector('#publisher').value.trim(),
        price: this.bookForm.querySelector('#price').value.trim(),
        pages: this.bookForm.querySelector('#pages').value.trim(),
        status: this.bookForm.querySelector('input[name="status"]:checked')?.value || "",
        comments: this.bookForm.querySelector('#comments').value.trim(),
        soldDate: this.bookForm.querySelector('#soldDate').value.trim(),
      };
  
      callback(payload);
      this.resetForm();
    });

    const resetButton = this.bookForm.querySelector('button[type="reset"]');
    if (resetButton) resetButton.onclick = () => this.resetForm();
  }

  bindCardActions(handleAddToCart, handleEdit, handleDelete) {
    if (!this.bookList) return;
    this.bookList.addEventListener("click", event => {
      const button = event.target.closest(".icon-button");
      if (!button || !button.dataset.action) return;

      const id = button.dataset.id;
      const action = button.dataset.action;

      if (action === "add-to-cart") handleAddToCart(id);
      else if (action === "edit") handleEdit(id);
      else if (action === "delete") handleDelete(id);
    });
  }

  // Detectar cambio en el select de módulo
setModuleChangeHandler(callback) {
  const moduleSelect = this.bookForm.querySelector("#moduleCode");
  this.moduleSelect = moduleSelect;
  moduleSelect.addEventListener("change", (event) => {
    const selectedModule = event.target.value;
    callback(selectedModule);
  });
}

// Mostrar error en el span correspondiente debajo del input/select
showFieldError(inputId, message) {
  const input = this.bookForm.querySelector(`#${inputId}`);
  if (!input) return;
  const parentDiv = input.closest("div"); // busca el div contenedor
  if (!parentDiv) return;

  const span = parentDiv.querySelector(".error");
  if (span) {
    span.textContent = message;
  } else {
    console.warn(`No se encontró <span class="error"> debajo de #${inputId}`);
  }
}

// Limpiar error del span
clearFieldError(inputId) {
  const input = this.bookForm.querySelector(`#${inputId}`);
  if (!input) return;
  const parentDiv = input.closest("div");
  if (!parentDiv) return;

  const span = parentDiv.querySelector(".error");
  if (span) span.textContent = "";
  }
}

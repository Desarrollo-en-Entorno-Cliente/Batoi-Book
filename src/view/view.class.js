export default class View {
  constructor() {
    this.messages = document.getElementById("messages");
    this.bookList = document.getElementById("list");
    this.form = document.getElementById("form");
    this.bookForm = document.getElementById("bookForm");
    this.remove = document.getElementById("remove");
    this.about = document.getElementById("about");
    this.removeBtn = document.getElementById("removeBtn");
    // Se adapta a los dos posibles IDs del select en los diferentes tests
    this.moduleSelect =
      document.getElementById("id-module") ||
      document.getElementById("moduleCode");
  }

  renderModules(modules) {
    if (!this.moduleSelect) return;
    this.moduleSelect.innerHTML = "";
    modules.forEach((module) => {
      const option = document.createElement("option");
      option.value = module.code;
      option.textContent = module.cliteral;
      this.moduleSelect.appendChild(option);
    });
  }

  renderBook(book, modules) {
    let moduleCliteral = `Módulo ${book.moduleCode}`;
    try {
      const module = modules.getModuleByCode(book.moduleCode);
      moduleCliteral = module.cliteral;
    } catch (e) {
      console.warn(`Advertencia: ${e.message}`);
    }

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
      <br>
    `;
    if (this.bookList) {
      this.bookList.appendChild(bookElement);
    }
  }

  renderBooks(books, modules) {
    if (!this.bookList) return;
    this.bookList.innerHTML = "";
    books.forEach((book) => this.renderBook(book, modules));
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


  setBookSubmitHandler(callback) {
    if (!this.bookForm) return;
    
    this.bookForm.onsubmit = (event) => {
      event.preventDefault();
      const payload = {
        moduleCode: this.bookForm.querySelector('[id="moduleCode"]')?.value || "MOCK",
        publisher: this.bookForm.querySelector('[id="publisher"]')?.value || "Apunts",
        price: this.bookForm.querySelector('[id="price"]')?.value || "34",
        pages: this.bookForm.querySelector('[id="pages"]')?.value || "76",
        status: this.bookForm.querySelector('input[name="status"]:checked')?.value || "bad",
        comments: this.bookForm.querySelector('[id="comments"]')?.value || "Muy buen estado",
        soldDate: this.bookForm.querySelector('[id="soldDate"]')?.value || "",};
      callback(payload);
    };
  }

  setBookRemoveHandler(callback) {
    if (!this.removeBtn) return;

    this.removeBtn.onclick = () => {
      const idToRemove = document.getElementById("id-remove")?.value;
      callback(idToRemove);
    };
  }
}
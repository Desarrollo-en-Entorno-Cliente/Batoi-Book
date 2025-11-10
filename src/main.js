import Controller from "./controller/controller.class.js";
import './style.css';
import javascriptLogo from '/image.png';

// Renderizamos el HTML inicial
document.querySelector("#app").innerHTML = `
<header>
  <img src="${javascriptLogo}" class="logo" alt="Batoi logo" />
  <h1>BatoiBooks</h1>
</header>
<nav>
  <ul>
    <li><a href="#list">Ver Libros</a></li>
    <li><a href="#form">Añadir Libro</a></li>
    <li><a href="#about">Acerca de...</a></li>
  </ul>
</nav>
<div id="messages"></div>
<main>
  <div id="list"></div>
  <div id="form">
    <h2 id="formTitle">Añadir libro</h2>
    <form id="bookForm" novalidate>
      <div id="book-id-container">
        <label for="bookId">ID:</label>
        <input type="text" id="bookId" name="bookId" disabled />
      </div>
      <div>
        <label for="moduleCode">Módulo:</label>
        <select id="moduleCode" name="moduleCode" required></select>
        <span class="error"></span>
      </div>
      <div>
        <label for="publisher">Editorial:</label>
        <input type="text" id="publisher" name="publisher" required minlength="3" />
        <span class="error"></span>
      </div>
      <div>
        <label for="price">Precio:</label>
        <input type="number" id="price" name="price" required min="0" step="0.01" />
        <span class="error"></span>
      </div>
      <div>
        <label for="pages">Páginas:</label>
        <input type="number" id="pages" name="pages" required min="1" />
        <span class="error"></span>
      </div>
      <div>
        <label>Estado:</label>
        <input type="radio" id="status-new" name="status" value="new" required />
        <label for="status-new">Nuevo</label>
        <input type="radio" id="status-good" name="status" value="good" />
        <label for="status-good">Bueno</label>
        <input type="radio" id="status-bad" name="status" value="bad" />
        <label for="status-bad">Malo</label>
        <br>
        <span class="error"></span>
      </div>
      <div>
        <label for="comments">Comentarios:</label>
        <textarea id="comments" name="comments"></textarea>
      </div>
      <div>
        <label for="soldDate">Fecha de venta (opcional):</label>
        <input type="date" id="soldDate" name="soldDate" />
      </div>
      <button type="submit">Guardar</button>
      <button type="reset">Reset</button>
    </form>
  </div>
  <div id="about">
    <p>Lorem ipsum dolor sit amet...</p>
  </div>
</main>
<footer>
  <p>Pedro Escobar</p>
</footer>
`;

// Instanciamos e inicializamos el controlador
document.addEventListener("DOMContentLoaded", () => {
  const myController = new Controller();
  myController.init();

  window.myViewInstance = myController.view;

  function showPage(pageId) {
    const pages = ["list", "form", "about"];
    pages.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.toggle("hidden", id !== pageId);
    });

    if (pageId === "form") {
      if (!window.isEditing) {
        window.myViewInstance.resetForm();
      }
      window.isEditing = false; 
    }
    
  }

  // Escuchador de cambios de hash
  window.addEventListener("hashchange", () => {
    const hash = window.location.hash.substring(1);
    if (["list", "form", "about"].includes(hash)) {
      showPage(hash);
    } else {
      showPage("list");
    }
  });

  // Mostrar página inicial según hash
  const initialHash = window.location.hash.substring(1) || "list";
  showPage(initialHash);



});

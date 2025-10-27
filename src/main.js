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
    <div id="list" class="active"></div>
    <div id="remove">
      <label for="id-remove">ID del libro a borrar:</label>
      <input type="text" id="id-remove" required />
      <button id="removeBtn">Borrar</button>
    </div>
    <div id="form">
      <form id="bookForm">
        <div>
          <label for="moduleCode">Módulo:</label>
          <select id="moduleCode" name="moduleCode" required></select>
        </div>
        <div>
          <label for="publisher">Editorial:</label>
          <input type="text" id="publisher" name="publisher" required minlength="3" />
        </div>
        <div>
          <label for="price">Precio:</label>
          <input type="number" id="price" name="price" required min="0" step="0.01" />
        </div>
        <div>
          <label for="pages">Páginas:</label>
          <input type="number" id="pages" name="pages" required min="1" />
        </div>
        <div>
          <label>Estado:</label>
          <input type="radio" id="status-new" name="status" value="new" required /> <label for="status-new">Nuevo</label>
          <input type="radio" id="status-good" name="status" value="good" /> <label for="status-good">Bueno</label>
          <input type="radio" id="status-bad" name="status" value="bad" /> <label for="status-bad">Malo</label>
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

// Instanciamos e inicializamos el controlador cuando la página se haya cargado
document.addEventListener("DOMContentLoaded", () => {
  const myController = new Controller();
  myController.init();
});
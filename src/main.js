import data from '/src/services/datos.js';
import * as func from '/src/functions.js';


import './style.css'
import javascriptLogo from '/image.png'


document.querySelector('#app').innerHTML = `
<center>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src=".${javascriptLogo}" class="logo" alt="Vite logo" />
    </a>
    <h1>BatoiBooks</h1>
    <p class="read-the-docs">
      Abre la consola para ver el resultado
    </p>
  </div>
  </center>
`
console.log(func.booksFromUser(data.books, 4));
console.log(func.booksWithStatus(func.booksFromModule(data.books, "5021"),"good"));
console.log(func.incrementPriceOfbooks(data.books, 0.1));
import Books from './model/books.class.js';
import Modules from './model/modules.class.js';
import Users from './model/users.class.js';

import './style.css';
import javascriptLogo from '/image.png';

const booksInstance = new Books();
const modulesInstance = new Modules();
const usersInstance = new Users();

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
`;

async function init() {
  await booksInstance.populate();
  await modulesInstance.populate();
  await usersInstance.populate();


  console.log(booksInstance.toString());
  console.log(usersInstance.toString());
  console.log(modulesInstance.toString());
}

init();

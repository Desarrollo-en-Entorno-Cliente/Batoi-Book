import data from '/src/services/datos.js';
// import * as func from '/src/functions.js';

import modules from './model/modules.class.js';
import users from './model/users.class.js';
import books from './model/books.class.js';

const booksInstance = new books();
const modulesInstance = new modules();
const usersInstance = new users();

booksInstance.populate(data.books);
modulesInstance.populate(data.modules);
usersInstance.populate(data.users);

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


const array5021 = booksInstance.booksFromModule('5021').map(b => b.toString());
console.log(array5021);


booksInstance.booksFromModule('5021').filter(b => b.status === 'new') .map(b => b.toString()).forEach(console.log);

booksInstance.booksFromModule('5021').map(b => {
        booksInstance.incrementPriceOfbooks(0.1);
        return b.toString();
    }).forEach(console.log);

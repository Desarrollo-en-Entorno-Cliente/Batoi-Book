import './style.css'
import javascriptLogo from '/image.png'

import '/src/functions.js'


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


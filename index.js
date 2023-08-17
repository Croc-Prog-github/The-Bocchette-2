import('./cons/cons.js')
.then(module => {
  //
})
.catch(error => {
  console.error('Errore caricamento Console, errore: ', error);
});

/*
import "express.js";
import "json";
import "next.js";
import "php";
*/

/*
const IDE = document.getElementsByClassName('MenuBar-MenuBar-p_D0w MenuBar-MenuBar_embedded-QBKoD');
IDE.style.display = 'none';
*/

window.location.href = '/load.html';
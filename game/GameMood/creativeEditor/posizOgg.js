function posizOgg(x, y, url) {
  var nuovoDiv = document.createElement('div');
    
  // Aggiungi del contenuto al nuovo div (puoi modificare il contenuto come preferisci)
  nuovoDiv.innerHTML = 'Questo è un nuovo div creato con JavaScript!';

  // Aggiungi una classe al nuovo div (opzionale, puoi rimuovere questa riga se non serve)
  nuovoDiv.classList.add('nuovo-div');

  // Ottieni il div padre con id "terr"
  var terrDiv = document.getElementById('terr');

  // Inserisci il nuovo div all'interno del div padre
  terrDiv.appendChild(nuovoDiv);
}

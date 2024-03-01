let isDuplicateTab = false;

// Controlla se il localStorage è supportato dal browser
if (typeof localStorage !== 'undefined') {
  // Verifica se la chiave 'tabId' è presente nel localStorage
  if (localStorage.getItem('tabId')) {
    isDuplicateTab = true;
  } else {
    // Se la chiave non è presente, imposta il valore corrente come chiave 'tabId'
    localStorage.setItem('tabId', Date.now().toString());
  }
}

// Se è una scheda duplicata, mostra un avviso
if (isDuplicateTab) {
  let alertInterval;

  // Mostra un avviso ogni 5 secondi (modifica secondo necessità)
  alertInterval = setInterval(function() {
    alert('Non puoi usare più di 1 scheda contemporaneamente!');
  }, 200);

  // Rimuovi l'identificatore di scheda quando la scheda viene chiusa
  window.addEventListener('beforeunload', function() {
    localStorage.removeItem('tabId');
    clearInterval(alertInterval);
  });

  // Interrompi la visualizzazione degli avvisi quando la scheda è attiva
  window.addEventListener('focus', function() {
    clearInterval(alertInterval);
  });
}
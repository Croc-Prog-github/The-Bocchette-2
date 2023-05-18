//Apre la finestra per la console

// Verifica se la scheda con il titolo "Console" è già aperta
function isTabOpen(title) {
  const tabs = Array.from(window.top.document.querySelectorAll('a'));
  return tabs.some(tab => tab.text === title);
}

// Apri una nuova scheda del browser con il titolo "Console" solo se non è già aperta
function openTab(title) {
  if (!isTabOpen(title)) {
    const newTab = window.open("", "_blank");
    newTab.document.title = title;
  }
}
// Utilizzo: chiamare la funzione openTab con il titolo desiderato
openTab("Console");

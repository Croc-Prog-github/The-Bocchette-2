function cons() {
  //Apre la finestra per la console

  // Verifica se la finestra con il titolo "Console" è già aperta
  function isWindowOpen(title) {
    const windows = Array.from(window.top.window);
    return windows.some(win => win.document.title === title);
  }

  // Apri una nuova finestra del browser con il titolo "Console" solo se non è già aperta
  function openWindow(title) {
    if (!isWindowOpen(title)) {
      window.open("", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=100,width=800,height=600");
      window.document.title = title;
    }
  }

  // Utilizzo: chiamare la funzione openWindow con il titolo desiderato
  openWindow("Console");

  //Crea l'HTML
  
}
// La console non è disponibile in alcuni file .html del gioco
function cons(pw) {
  if (pw != "Console") {
    window.alert("Password per apertura Console errata.");
    return "Password errata";
  } else {
    //Apre la finestra per la console

    // Verifica se la finestra con il titolo "Console" è già aperta
    function isWindowOpen(title) {
      const windows = Array.from(window.top.window);
      return windows.some(win => win.document.title === title);
    }
  
    function openWindow(title, html) {
      if (!isWindowOpen(title)) {
        const newWindow = window.open("Console", "_blank", "toolbar=no, scrollbars=no, resizable=no, top=100, left=100, width=500, height=200");
        newWindow.document.title = title;
        newWindow.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>Console</title>
          </head>
          <body style="background: black; color: white; font-family: monospace; cursor: url(/cons/mouse.svg), default;">
            A
          </body>
          </html>
        `);
        newWindow.document.close();
      }
    }
  
    openWindow("Console", "Console");
  
    return "Console_Aperta";
  }
}

function cons(pw) {
  if (pw != "Console") {
    window.alert("Password per apertura Console errata.");
    return "Password errata";
  } else {
    //Apre la finestra per la console

    // Verifica se la finestra con il titolo "Console" è già aperta
    function isWindowOpen(title) {
      const windows = Array.from(window.top.window);
      return windows.some(win => win.document.title === title);
    }
  }
}
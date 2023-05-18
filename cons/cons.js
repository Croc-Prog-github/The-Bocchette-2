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
        const newWindow = window.open("", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=100,width=800,height=600");
        newWindow.document.title = title;
        newWindow.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body {
                background-color: black;
              }
            </style>
          </head>
          <body>
            ${html}
          </body>
          </html>
        `);
        newWindow.document.close();
      }
    }
  
    const htmlContent = `A`;
  
    openWindow("Console", htmlContent);
  
    return "Console_Aperta";
  }
}
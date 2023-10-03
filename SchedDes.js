function SchedDes() {
  // Immagine Favicon
  const nuovoURLFavicon = 'https://docs.google.com/drawings/d/e/2PACX-1vRzg3r27e7_yLyB4m8rlyFHgQ8H5d6IJtW39axawbD5u7S_eX3ezqZdtll3NBLxJYY_OUhuSGJ-jQ8T/pub?w=16&h=16';
  const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'icon';
  link.href = nuovoURLFavicon;
  document.getElementsByTagName('head')[0].appendChild(link);

  // Title della pagina
  const titleElement = document.querySelector('title');
  const titoloPagina = titleElement.textContent;
  document.title = titoloPagina;
}
SchedDes();


// Disattiva Cronologia locale
window.history.pushState(null, null, window.location.href);
window.onpopstate = function() {
  window.history.pushState(null, null, window.location.href);
};


// Disattiva Tasto destro + Menù manipolato
let isContextMenuOpen = false; // Variabile per tracciare lo stato del menu

document.addEventListener("contextmenu", function (e) {
  e.preventDefault(); // Previeni l'apertura del menu del tasto destro predefinito

  if (!isContextMenuOpen) {
    // Crea il <div> del menu personalizzato solo se non è già aperto
    const customContextMenu = document.createElement("div");
    customContextMenu.style.position = "absolute";
    customContextMenu.style.backgroundColor = "white";
    customContextMenu.style.border = "1px solid #ccc";
    customContextMenu.style.padding = "5px";
    customContextMenu.style.boxShadow = "3px 3px 5px #888";
    customContextMenu.style.zIndex = "1000";
    customContextMenu.style.borderRadius = "5px";

    // Voce: "Web console"
    const webConsoleItem = document.createElement("div");
    webConsoleItem.className = "MenuLabel";
    webConsoleItem.textContent = "Web console";
    webConsoleItem.style.cursor = "pointer";
    webConsoleItem.style.padding = "5px";
    webConsoleItem.addEventListener("click", function () {
      // Apre la console del browser
    });

    // Voce: "View source code"
    /*
    const ViewSourceCode = document.createElement("div");
    ViewSourceCode.className = "MenuLabel";
    ViewSourceCode.textContent = "View source code";
    ViewSourceCode.style.cursor = "pointer";
    ViewSourceCode.style.padding = "5px";
    ViewSourceCode.addEventListener("click", function () {
      // Apre il codice sorgente (Ctrl + U)
      const newTab = window.open("", "_blank");
      newTab.document.write("<pre>" + escapeHtml(document.documentElement.outerHTML) + "</pre>");
    });
    */


    // Aggiungi le voci al menu
    customContextMenu.appendChild(webConsoleItem);
    //customContextMenu.appendChild(ViewSourceCode);

    // Posiziona il menu dove è stato fatto clic con il tasto destro
    customContextMenu.style.left = e.clientX + "px";
    customContextMenu.style.top = e.clientY + "px";

    // Aggiungi il menu al documento
    document.body.appendChild(customContextMenu);

    // Imposta lo stato del menu come aperto
    isContextMenuOpen = true;

    // Chiudi il menu personalizzato quando si fa clic altrove sulla pagina
    const closeContextMenu = function () {
      document.body.removeChild(customContextMenu);
      document.removeEventListener("click", closeContextMenu);
      // Imposta lo stato del menu come chiuso
      isContextMenuOpen = false;
    };

    document.addEventListener("click", closeContextMenu);
  }
});

function escapeHtml(html) {
  const escapeEl = document.createElement("textarea");
  escapeEl.textContent = html;
  return escapeEl.innerHTML;
}
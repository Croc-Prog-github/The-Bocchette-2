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
document.addEventListener("contextmenu", function (e) {
  e.preventDefault(); // Previeni l'apertura del menu del tasto destro predefinito

  // crea il <div>
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
  webConsoleItem.className = "MenuLabel"
  webConsoleItem.textContent = "Web console";
  webConsoleItem.style.cursor = "pointer";
  webConsoleItem.style.padding = "5px";
  webConsoleItem.addEventListener("click", function () {
    // Apre la console del browser

  });

  // Aggiungi la voce "Web console" al menu personalizzato
  customContextMenu.appendChild(webConsoleItem);

  // Posiziona il menu personalizzato dove è stato fatto clic con il tasto destro
  customContextMenu.style.left = e.clientX + "px";
  customContextMenu.style.top = e.clientY + "px";

  // Aggiungi il menu personalizzato al documento
  document.body.appendChild(customContextMenu);

  // Chiudi il menu personalizzato quando si fa clic altrove sulla pagina
  document.addEventListener("click", function () {
    document.body.removeChild(customContextMenu);
  });
});

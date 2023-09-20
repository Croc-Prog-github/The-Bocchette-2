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
//setInterval(function() {}, 100)
SchedDes();

  function scar(text) {
    const encryptedText = btoa(text);
    const fileName = 'file.encrypt';

    const downloadLink = document.createElement('a');
    downloadLink.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(encryptedText);
    downloadLink.download = fileName;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }



  function decryptFile(file) {
  const reader = new FileReader();
  reader.onload = function(event) {
    const encryptedText = event.target.result;
    const decryptedText = atob(encryptedText);

    // Fai qualcosa con il testo decriptato
    console.log(decryptedText);
    window.alert('DATI RECUPERATI: ' + decryptedText);
  };

  reader.readAsText(file);
}

function handleFileSelect(event) {
  const file = event.target.files[0];
  const fileName = file.name;

  if (!fileName.endsWith('.encrypt')) {
    alert('Si prega di selezionare un file .encrypt');
    return;
  }

  // Azzera il valore del campo di input file
  this.value = null;

  decryptFile(file);
}

const fileInput = document.getElementById('file-upload');
const label = document.querySelector('label[for="file-upload"]');
const button = label.parentElement;

button.addEventListener('mousedown', function(event) {
  event.stopPropagation(); // Ferma la propagazione dell'evento

  const confirmResult = window.confirm('I dati che caricherai dal PC sostituiranno i progressi attuali; continuare?');
  if (!confirmResult) {
    event.preventDefault(); // Ferma l'azione predefinita dell'evento
    return;
  }

  // Apre il campo di input file
  fileInput.click();
});

fileInput.addEventListener('change', handleFileSelect);
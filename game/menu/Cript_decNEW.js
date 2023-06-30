const now = new Date();
const date = now.toLocaleDateString();

function getCurrentDateTime() {
  const time = now.toLocaleTimeString();
  return date + ' ' + time;
}

function createFileContent(text) {
  const dateTime = getCurrentDateTime();
  const fileContent = dateTime + '\n\n' + text;
  return fileContent;
}

function encryptText(text, key) {
  const encryptedText = CryptoJS.AES.encrypt(text, key).toString();
  return encryptedText;
}

function downloadFile(text) {
  const encryptedText = encryptText(text);
  const fileContent = createFileContent(encryptedText);
  const fileBlob = new Blob([fileContent], { type: 'text/plain' });
  const fileURL = URL.createObjectURL(fileBlob);
  const fileName = 'Salvataggio del ' + date + '.encrypt';

  const link = document.createElement('a');
  link.href = fileURL;
  link.download = fileName;
  link.click();
}

function decryptAndReadFile(file) {
  const reader = new FileReader();
  reader.onload = function(event) {
    const fileContent = event.target.result;
    const lines = fileContent.split('\n');
    const fileDateTime = lines[0];
    const fileDate = fileDateTime.split(' ')[0];

    if (fileDate === date) {
      const encryptedText = lines.slice(2).join('\n');
      const decryptedText = atob(encryptedText);
      alert(decryptedText);
    } else {
      alert('I 2 file non coincidono!');
      window.location.href = '/game/menu/GestDat.html';
    }
  };
  reader.readAsText(file);
}

function handleFileSelect(event) {
  const file = event.target.files[0];
  const fileName = file.name;
  if (!fileName.endsWith('.encrypt')) {
    alert('Selezionare un file .encrypt');
    return;
  }
  decryptAndReadFile(file);
}

function scar(text) {
  downloadFile(text);
}

const fileInput = document.querySelector('input[type="file"]');
fileInput.addEventListener('change', handleFileSelect);
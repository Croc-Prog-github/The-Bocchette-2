const express = require('express');
const app = express();
const port = 3000; // Puoi modificare la porta se necessario

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server avviato sulla porta ${port}`);
});
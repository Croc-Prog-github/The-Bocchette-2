const puppeteer = require('puppeteer');
const { exec } = require('child_process');

(async () => {
  // Avvia il server usando Vite
  const viteProcess = exec('npm run publish');

  // Monitora l'output del processo di Vite per sapere quando è pronto
  viteProcess.stdout.on('data', (data) => {
    const viteReadyString = 'Vite server is ready'; // Cambia questo in base alla stringa che indica che Vite è pronto

    if (data.includes(viteReadyString)) {
      console.log('Vite is ready');

      // Simula il clic del tasto "o" nella console
      exec('powershell -Command "Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.SendKeys]::SendWait(\'o\')"');

      (async () => {
        // Avvia il browser con Puppeteer
        const browser = await puppeteer.launch({
          headless: false, // Cambia a true se non vuoi vedere il browser
          args: ['--remote-debugging-port=9222'] // Permetti il debug remoto
        });

        const page = await browser.newPage();
        await page.goto('http://localhost:5173'); // Cambia l'URL se necessario

        // Aspetta che la pagina si carichi
        await page.waitForSelector('body');

        // Attendi 5 ms
        await new Promise(resolve => setTimeout(resolve, 5));

        // Simula il clic del tasto "r" nella console
        await page.keyboard.press('r');

        // Simula il clic del tasto sinistro del mouse
        await page.mouse.click(100, 100); // Cambia le coordinate se necessario

        // Chiudi il browser
        await browser.close();

        // Chiudi il processo di Vite
        viteProcess.kill();
      })();
    }
  });

  // Gestione degli errori del processo Vite
  viteProcess.stderr.on('data', (data) => {
    console.error(`Errore vite: ${data}`);
  });

  viteProcess.on('close', (code) => {
    console.log(`Processo Vite terminato con codice ${code}`);
  });
})();
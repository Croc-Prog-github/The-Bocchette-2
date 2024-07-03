const puppeteer = require('puppeteer');

(async () => {
  // Avvia il server usando Vite
  const { exec } = require('child_process');
  const viteProcess = exec('npm run publish');

  // Attendi che il server si avvii
  await new Promise(resolve => setTimeout(resolve, 5000));

  // Avvia il browser con Puppeteer
  const browser = await puppeteer.launch({
    headless: false, // Cambia a true se non vuoi vedere il browser
    args: ['--remote-debugging-port=9222'] // Permetti il debug remoto
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:3000'); // Cambia l'URL se necessario

  // Aspetta che la pagina si carichi
  await page.waitForSelector('body');

  // Simula il clic del tasto sinistro del mouse
  await page.mouse.click(100, 100); // Cambia le coordinate se necessario

  // Simula il clic del tasto "r" nella console
  page.keyboard.press('r');

  // Chiudi il browser
  await browser.close();

  // Chiudi il processo di Vite
  viteProcess.kill();
})();
const puppeteer = require('puppeteer');

(async () => {
  // Avvia il server usando Vite
  const { exec } = require('child_process');
  const viteProcess = exec('npm run publish');

  // Simula il clic del tasto "o" nella console
  exec('powershell -Command "Start-Sleep -Seconds 5; Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.SendKeys]::SendWait(\'o\')"');

  // Avvia il browser con Puppeteer
  const browser = await puppeteer.launch({
    headless: false, // Cambia a true se non vuoi vedere il browser
    args: ['--remote-debugging-port=9222'] // Permetti il debug remoto
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:5173'); // URL della pagina web

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
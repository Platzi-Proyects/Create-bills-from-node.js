import puppeteer from 'puppeteer';

async function htmlToPdf() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  const html = `
    <h1>Hola mundo</h1>
    <table border="1">
      <tr><th>Nombre</th><th>Edad</th></tr>
      <tr><td>Juan</td><td>25</td></tr>
    </table>
  `;
  
  await page.setContent(html);
  await page.pdf({ path: 'tabla.pdf', format: 'A4' });
  
  await browser.close();
  console.log('PDF creado con Puppeteer');
}

htmlToPdf();

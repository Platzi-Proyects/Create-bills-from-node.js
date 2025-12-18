// server.mjs
import fs from 'fs';
import http from 'http';

// ───── DATOS ─────
let bill = {
  productos: [],
  precios: []
};

let step = 0;

// ───── CONSOLA ─────
console.log('Producto:');

process.stdin.on('data', (data) => {
  const input = data.toString().trim().toLowerCase();

  // PASO 0 → producto
  if (step === 0) {
    console.log('Precio:');
    bill.productos.push(input);
    step = 1;
    return;
  }

  // PASO 1 → precio
  if (step === 1) {
    bill.precios.push(Number(input));
    console.log('¿Otro producto? (si / no)');
    step = 2;
    return;
  }

  // PASO 2 → continuar o terminar
  if (step === 2) {
    if (input === 'si') {
      console.log('Producto:');
      step = 0;
    } else {
      generarHTML();
      process.stdin.pause();
    }
  }
});

// ───── GENERAR HTML ─────
function generarHTML() {
  let items = '';

  for (let i = 0; i < bill.productos.length; i++) {
    items += `
      <li>
        ${bill.productos[i]} - $${bill.precios[i]}
      </li>
    `;
  }

  const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <title>Factura</title>
    </head>
    <body>
      <h1>Factura</h1>
      <ul>
        ${items}
      </ul>
    </body>
  </html>
  `;

  fs.writeFileSync('factura.html', html);
  console.log('Factura generada: factura.html');
}

// ───── SERVER ─────
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    const html = fs.readFileSync('factura.html');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(3005, () => {
  console.log('Server running → http://localhost:3005');
});

// ───── EXIT ─────
process.on('exit', () => {
  console.log('Programa terminado');
});


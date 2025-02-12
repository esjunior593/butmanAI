const venom = require('venom-bot');
const axios = require('axios');
const mysql = require('mysql2/promise');
const config = require('./config');
const fs = require('fs');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Servir archivos estáticos (para mostrar el QR)
app.use(express.static('public'));

// Crear la sesión de WhatsApp con Venom
venom
  .create({
    session: 'whatsapp-session',
    multidevice: false,  // Desactivar multi-dispositivo para asegurar que pida el QR
    headless: false,      // Mostrar la ventana del navegador en Railway
    logQR: true,          // Mostrar el QR en los logs de Railway
    browserArgs: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu',
      '--single-process',
      '--no-zygote'
    ],
    executablePath: '/usr/bin/chromium-browser'
  })
  .then((client) => {
    console.log("✅ Bot de WhatsApp iniciado correctamente");

    client.onQR((qrCode) => {
      console.log('📌 QR generado, escanéalo desde los logs de Railway:');
      console.log(qrCode);  // Imprime el QR en los logs

      // Guardar el QR como imagen para verlo en la URL
      const fs = require('fs');
      const qrImage = Buffer.from(qrCode.replace(/^data:image\/png;base64,/, ""), "base64");
      fs.writeFileSync("public/qr.png", qrImage);
    });
  })
  .catch(error => console.log('❌ Error al iniciar bot:', error));

// Servir el QR desde un archivo
app.get('/qr', (req, res) => {
  const qrPath = 'public/qr.png';
  if (fs.existsSync(qrPath)) {
    res.sendFile(__dirname + '/' + qrPath);
  } else {
    res.send('QR no generado aún.');
  }
});

// Iniciar el servidor Express
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

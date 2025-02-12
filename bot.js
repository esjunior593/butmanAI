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
    multidevice: true,
    headless: true,
    browserArgs: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu',
      '--single-process',
      '--no-zygote'
    ],
    executablePath: '/usr/bin/chromium-browser' // Usar Chromium del sistema
  })
  .then((client) => {
    console.log("✅ Bot de WhatsApp iniciado correctamente");

    client.onQR((base64QR) => {
      console.log('📌 QR generado, guardándolo en public/qr.png');
      const qrImage = Buffer.from(base64QR.replace(/^data:image\/png;base64,/, ""), "base64");
      fs.writeFileSync("public/qr.png", qrImage);
    });

    // Escuchar mensajes
    client.onMessage(async (message) => {
      if (message.body.startsWith('/cod ')) {
        const correo = message.body.split(' ')[1];
        if (!correo || !correo.includes('@')) {
          client.sendText(message.from, '⚠️ Formato incorrecto. Usa: /cod correo@gmail.com');
          return;
        }

        try {
          const apiUrl = `https://script.google.com/macros/s/AKfycbymWzWk196Xi6ayjvnKbWOilSOCcR7UBGq-a2Af4AF-eyNMNwSkPB6fbDCqlapSHMF9xQ/exec?email=${encodeURIComponent(correo)}`;
          const response = await axios.get(apiUrl);
          const data = response.data;

          if (data.mensaje) {
            client.sendText(message.from, `📌 Respuesta de la API:\n${data.mensaje}`);
          } else {
            client.sendText(message.from, '❌ No se encontró información para este correo.');
          }
        } catch (error) {
          client.sendText(message.from, '⚠️ Hubo un error al buscar la información.');
          console.error(error);
        }
      }
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

const venom = require('venom-bot');
const fs = require('fs');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Crear la carpeta "public" si no existe
if (!fs.existsSync('public')) {
    fs.mkdirSync('public');
}

// Servir archivos estáticos para mostrar el QR
app.use(express.static('public'));

// Iniciar Venom-Bot en Render con Puppeteer correctamente configurado
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
    ]
  })
  .then((client) => {
    console.log("✅ Bot de WhatsApp iniciado correctamente");

    client.onQR((qrCode) => {
      console.log('📌 QR generado. Escanéalo desde los logs de Render:');
      console.log(qrCode);

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

// Iniciar el servidor Express en Render
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

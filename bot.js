const venom = require('venom-bot');
const axios = require('axios');

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

    client.onMessage(async message => {
      const text = message.body.trim();
      
      // Comando /key {llave}
      if (text.startsWith('/key ')) {
        const llave = text.split(' ')[1];
        if (!llave) {
          client.sendText(message.from, '⚠️ Usa el formato: /key ABC12-12345');
          return;
        }

        try {
          const apiUrl = `https://api-fazt-prod-serv.up.railway.app/API/cuentas/${llave}`;
          const response = await axios.get(apiUrl);
          client.sendText(message.from, `📌 Respuesta de la API:\n${JSON.stringify(response.data, null, 2)}`);
        } catch (error) {
          client.sendText(message.from, '⚠️ Error al consultar la API.');
          console.error(error);
        }
      }

      // Comando /up {correo}/{clave}
      else if (text.startsWith('/up ')) {
        const parts = text.split(' ')[1]?.split('/');
        if (!parts || parts.length !== 2) {
          client.sendText(message.from, '⚠️ Usa el formato: /up correo@gmail.com/clave123');
          return;
        }

        const [correo, clave] = parts;
        try {
          const apiUrl = `https://api-fazt-prod-serv.up.railway.app/api/personas?usuario=${encodeURIComponent(correo)}&acceso=${encodeURIComponent(clave)}`;
          const response = await axios.get(apiUrl);
          client.sendText(message.from, `📌 Respuesta de la API:\n${JSON.stringify(response.data, null, 2)}`);
        } catch (error) {
          client.sendText(message.from, '⚠️ Error al consultar la API.');
          console.error(error);
        }
      }

      // Comando /cod {correo}
      else if (text.startsWith('/cod ')) {
        const correo = text.split(' ')[1];
        if (!correo || !correo.includes('@')) {
          client.sendText(message.from, '⚠️ Usa el formato: /cod correo@gmail.com');
          return;
        }

        try {
          const apiUrl = `https://script.google.com/macros/s/AKfycbymWzWk196Xi6ayjvnKbWOilSOCcR7UBGq-a2Af4AF-eyNMNwSkPB6fbDCqlapSHMF9xQ/exec?email=${encodeURIComponent(correo)}`;
          const response = await axios.get(apiUrl);
          client.sendText(message.from, `📌 Respuesta de la API:\n${JSON.stringify(response.data, null, 2)}`);
        } catch (error) {
          client.sendText(message.from, '⚠️ Error al consultar la API.');
          console.error(error);
        }
      }

    });
  })
  .catch(error => console.log('❌ Error al iniciar bot:', error));

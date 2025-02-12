# Usa una imagen compatible con Puppeteer en Render
FROM ghcr.io/puppeteer/puppeteer:latest

# Crear directorio de trabajo
WORKDIR /app

# Copiar los archivos del proyecto
COPY package*.json ./
RUN npm install --omit=dev

COPY . .

# Exponer el puerto para la API del QR
EXPOSE 3000

# Comando de inicio
CMD ["node", "bot.js"]

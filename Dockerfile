# Usar una imagen oficial de Puppeteer con Node.js preconfigurado
FROM ghcr.io/puppeteer/puppeteer:latest

# Configurar el directorio de trabajo
WORKDIR /app

# Copiar archivos necesarios
COPY package*.json ./
COPY bot.js ./
COPY config.js ./
RUN mkdir -p /app/public
COPY public ./public

# Instalar dependencias de Node.js
RUN npm install

# Exponer el puerto para el servidor (si es necesario)
EXPOSE 3000

# Iniciar el bot
CMD ["node", "bot.js"]

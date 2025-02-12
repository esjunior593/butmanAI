# Usar una imagen oficial de Node.js con Puppeteer preconfigurado
FROM ghcr.io/puppeteer/puppeteer:latest

# Configurar el directorio de trabajo
WORKDIR /app

# Instalar Chromium manualmente para evitar errores de Puppeteer
RUN apt-get update && apt-get install -y \
    chromium \
    libnss3 \
    libatk-bridge2.0-0 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxi6 \
    libxtst6 \
    libappindicator3-1 \
    libasound2 \
    xdg-utils \
    fonts-liberation \
    libgbm1 \
    libX11-xcb1 \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxext6 \
    libxfixes3 \
    libcups2 \
    libdbus-1-3 \
    libfontconfig1 \
    libxrandr2 \
    libxrender1 \
    libgtk-3-0 \
    libpangocairo-1.0-0 \
    libcairo2 \
    libpango-1.0-0 \
    libatk1.0-0 \
    libgdk-pixbuf2.0-0 \
    libgdk-pixbuf-2.0-0 \
    libglib2.0-0

# Copiar archivos del proyecto
COPY package*.json ./
COPY bot.js ./
COPY config.js ./
COPY public ./public

# Instalar Puppeteer sin descargar Chromium (usará el del sistema)
RUN npm install --unsafe-perm=true --allow-root \
    && npm rebuild puppeteer \
    && npm install puppeteer --no-bin-links --no-optional

# Exponer el puerto para el servidor (si es necesario)
EXPOSE 3000

# Iniciar el bot
CMD ["node", "bot.js"]

# Usar una imagen de Playwright que ya incluye Chromium y Puppeteer
FROM mcr.microsoft.com/playwright:v1.39.0-focal

# Configurar el directorio de trabajo
WORKDIR /app

# Copiar archivos del proyecto
COPY package*.json ./
COPY bot.js ./
COPY config.js ./
COPY public ./public

# Instalar dependencias de Node.js y Puppeteer sin permisos restringidos
RUN npm install --unsafe-perm=true --allow-root

# Exponer el puerto para el servidor (si es necesario)
EXPOSE 3000

# Iniciar el bot
CMD ["node", "bot.js"]

# Usa Playwright en lugar de Puppeteer para evitar problemas en Railway
FROM mcr.microsoft.com/playwright:v1.39.0-focal

# Configuración del entorno
WORKDIR /app

# Copiar archivos del proyecto
COPY package*.json ./
RUN npm install --omit=dev

# Copiar el código del bot
COPY . .

# Asegurar permisos correctos para Playwright
RUN npx playwright install --with-deps

# Exponer puerto (si usas Express para mostrar el QR)
EXPOSE 3000

# Comando de inicio
CMD ["node", "bot.js"]

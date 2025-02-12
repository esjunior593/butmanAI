# Usar una imagen oficial de Puppeteer con Node.js preconfigurado
FROM ghcr.io/puppeteer/puppeteer:latest

# Configurar el directorio de trabajo
WORKDIR /app

# Copiar archivos del proyecto
COPY package*.json ./
COPY bot.js ./
COPY config.js ./
COPY public ./public
COPY install.sh /app/install.sh  # Asegura que se copie en /app

# Dar permisos de ejecución a install.sh
RUN chmod +x /app/install.sh

# Ejecutar install.sh después de npm install
RUN /app/install.sh

# Instalar dependencias de Node.js
RUN npm install

# Exponer el puerto para el servidor (si es necesario)
EXPOSE 3000

# Iniciar el bot
CMD ["node", "bot.js"]

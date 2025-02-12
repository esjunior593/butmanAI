#!/bin/bash
echo "🔧 Instalando dependencias para Puppeteer..."
apt-get update && apt-get install -y \
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

echo "✅ Dependencias instaladas correctamente."

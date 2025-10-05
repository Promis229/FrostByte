# 🌌 FrostByte - Dockerfile Multi-stage
FROM node:18-alpine AS builder

# Installer les dépendances système nécessaires
RUN apk add --no-cache python3 py3-pip python3-dev build-base

# Créer le répertoire de travail
WORKDIR /app

# Copier les fichiers de configuration
COPY package*.json ./
COPY requirements.txt ./

# Installer les dépendances Node.js
RUN npm ci --only=production

# Créer l'environnement Python
RUN python3 -m venv /app/venv
ENV PATH="/app/venv/bin:$PATH"

# Installer les dépendances Python
RUN pip install --no-cache-dir -r requirements.txt

# Copier le code source
COPY . .

# Exposer les ports
EXPOSE 5000 5001 8501

# Variables d'environnement
ENV NODE_ENV=production
ENV PYTHON_ENV=production
ENV PATH="/app/venv/bin:$PATH"

# Script de démarrage
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Commande par défaut
CMD ["docker-entrypoint.sh"]

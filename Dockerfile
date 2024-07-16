# Utilisez l'image Node.js 14 comme base
FROM node:18

# Créez le répertoire de travail de l'application
WORKDIR /usr/src/app

# Copiez les fichiers de dépendances de l'application
COPY package*.json ./

# Installez les dépendances
RUN npm install

# Copiez les fichiers de l'application
COPY . .

# Exposez le port sur lequel l'application s'exécute
EXPOSE 3600

# Commande par défaut pour démarrer l'application
CMD ["npm", "start"]

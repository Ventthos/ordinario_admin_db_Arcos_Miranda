# Usa una imagen base de Node.js
FROM node:18

# Crea un directorio de trabajo
WORKDIR /app

# Copia el package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 3000

# Comando para iniciar el servidor
CMD ["node", "server.js"]

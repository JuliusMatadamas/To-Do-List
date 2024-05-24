# Usar una imagen base de NodeJS
FROM node:20.9

# Establecer el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copiar el package.json y package-lock.json al contenedor
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código al contenedor
COPY . .

# Compilar el proyecto TypeScript
RUN npm run build

# Exponer el puerto que usa la aplicación
EXPOSE 3000

# Definir el comando para iniciar la aplicación
CMD ["npm", "start"]

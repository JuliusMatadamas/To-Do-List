FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

# instalar todas las dependencias, incluidas las devDependencies
RUN npm install -g npm@latest

COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]
# Usa una imagen base de Node.js 18
FROM node:18.20.4

# Establece el directorio de trabajo
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copia el archivo package.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de tu proyecto
COPY . .

RUN mv .env.example .env

# Construye la aplicación usando Webpack
RUN npm run build

# Exponer el puerto que usará la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "dist/main.js"]
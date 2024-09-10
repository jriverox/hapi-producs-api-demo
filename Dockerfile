# Establecer la imagen base
FROM node:20.17-alpine3.19

ARG APP_DIR=/app

# Crear el directorio de trabajo
WORKDIR ${APP_DIR}

# Copiar los archivos de artefacto y los archivos necesarios
COPY package*.json ${APP_DIR}/

RUN npm install

COPY . .

RUN npm run build

# Exponer el puerto 8080
EXPOSE 8080

# Iniciar la aplicación
CMD ["npm", "start"]

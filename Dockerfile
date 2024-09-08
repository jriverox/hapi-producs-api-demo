# Establecer la imagen base
FROM node:20.17-alpine3.19

ARG APP_DIR=/products-api

# Crear el directorio de trabajo
WORKDIR ${APP_DIR}

# Copiar los archivos de artefacto y los archivos necesarios
COPY dist ${APP_DIR}/dist/
COPY package.json package-lock.json ${APP_DIR}/

# Instalar las dependencias de producción
RUN npm ci --only=production

# Exponer el puerto 8080
EXPOSE 8080

# Iniciar la aplicación
CMD ["npm", "start"]

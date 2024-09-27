# hapi-producs-api-demo

Una API muy simple con fines de pruebas, aprendizaje y despliegues en cloud.

## Generar la tabla y los datos de prueba

Esta demo requiere una base de datos Postgres con datos y un esquema especifico.

### Resumen de los pasos a seguir en esta demo:

- [Crear la base de datos y generar data fake](https://github.com/jriverox/products-faker-generator)
- Para crear el codigo del Api de este demo clona este repo y sigue los pasos de este README.
- [Desplegar la API en GCP Cloud Run](./gcp/cloud-run-deployment.md)
- [Crear y configurar un Api Gateway para exponer los endpoints](./gcp/api-gateway-deployment.md)

## Configurar conexión de base de datos

Una vez que preperes la base de datos, clona este repositorio y crea un archivo .env (copia el .env-example o renombralo y establece los valores de las variables).

## Instalar paquetes NPM

```bash
npm install
```

## Ejecutar localmente para hacer una prueba rapida.

```bash
npm run dev
```

## Prueba las routas desde tu local

```bash
curl --location 'localhost:8080/products/1'
```

## Constuir la Imagen Docker

```bash
npm run build
```

## Create a Docker image

Puedes cambiar el nombre "hapi-producs-api-demo" por el que tu desees.

```bash
docker build -t hapi-producs-api-demo .
```

## Ejecutar el contenedor Docker

Recuerda establecer las variables de entorno de conexión a la base de datos de postgresql.

Remeber execute the "npm run build" before to generate the dist folder.

```bash
docker run -p 8080:8080 \
  -e DB_HOST=<host here> \
  -e DB_PORT=<db port> \
  -e DB_DATABASE=<database here> \
  -e DB_USERNAME=<username here> \
  -e DB_PASSWORD=<passwrod here> \
  -e DB_SYNCHRONIZE=true \
  -e DB_LOGGING=false \
  hapi-producs-api-demo
```

## Deploy to GCP
[Pasos para desplegar en GCP Cloud Run](gcp/cloud-run-deployment.md)

### Build the image and upload it to Google Container Registry

```bash
gcloud builds submit --tag gcr.io/[GCP_PROJECT_ID]/hapi-producs-api-demo
```

### Deploy to Cloud Run

```bash
gcloud run deploy products-api \
     --image gcr.io/[GCP_PROJECT_ID]/hapi-producs-api-demo \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated \
     --set-env-vars=DB_HOST=<host here>,DB_PORT=5432,DB_DATABASE=<database name here>,DB_USERNAME=<username here>,DB_PASSWORD=<password here>,DB_SYNCHRONIZE=false,DB_LOGGING=false
```
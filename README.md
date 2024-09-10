# hapi-producs-api-demo

A simple Products API using hapi.js for demo pourpose

## Install NPM packages

```bash
npm install
```

## Run locally

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Create a Docker image

Feel free to replace the name "hapi-producs-api-demo" with the value you want.

```bash
docker build -t hapi-producs-api-demo .
```

## Run the Docker Container

Feel free to replace the ports and please provide your postgres database connection in the environments variables.

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

### Build the image and upload it to Google Container Registry

```bash
gcloud builds submit --tag gcr.io/jrx-demo-cloud-run/hapi-producs-api-demo
````

### Deploy to Cloud Run

```bash
gcloud run deploy jrx-products-api \
     --image gcr.io/jrx-demo-cloud-run/hapi-producs-api-demo \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated \
     --set-env-vars=DB_HOST=<host here>,DB_PORT=5432,DB_DATABASE=<database name here>,DB_USERNAME=<username here>,DB_PASSWORD=<password here>,DB_SYNCHRONIZE=false,DB_LOGGING=false
```
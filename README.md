# hapi-producs-api-demo
A simple Products API using hapi.js for demo pourpose

## To Install NPM packages

```bash
npm install
```

## To Run locally

```bash
npm run dev
```

## To Build

```bash
npm run build
```

## To Create Docker image

Feel free to replace the name "hapi-producs-api-demo" with the value you want.

```bash
docker build -t hapi-producs-api-demo .
```

## To Run the Docker Image

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

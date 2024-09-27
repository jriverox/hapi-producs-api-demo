# Instrucciones para desplegar en GCP Cloud Run

Cloud Run es un servicio serverless para desplegar contenedores.

## Instrucciones para el despliegue usando el CLI

Una vez yengas instalado el CLI de GCP (gcloud) y en caso que tengas varias cuentas y proyectos asegúrate de configurar el usuario y proyecto en el que vas a desplegar.

1. Configura tu usuario

```bash
gcloud config set account [usuario@dominio.com]
```

2. Configura el proyecto. Recuerda que tambien pude ser buena idea crear un proyecto nuevo, asi se facilitará eliminar todos los recursos creados en él.

Para esta demo usaré como nombre del proyecto **demo-cloud-run**

```bash
gcloud config set project jrx-demo-cloud-run
```

*Nota:* Los pasos siguientes requieren que estes autenticado con Doker en el Artifact Registry de GCP (GCR), en caso de dudas [navega a la documentación](https://cloud.google.com/artifact-registry/docs/docker/authentication).

3. Construye la imagen localmente

```bash
docker build --platform linux/amd64 -t gcr.io/demo-cloud-run/producs-api-demo .
```

4. Sube la imagen a GCR

```bash
docker push gcr.io/demo-cloud-run/producs-api-demo
```

5. Lista los contenedores del GCR

```bash
gcloud container images list --repository=gcr.io/demo-cloud-run
```

6. Depliega el contenedor en Cloud Run

```bash
gcloud run deploy producs-api-demo \
    --image gcr.io/demo-cloud-run/producs-api-demo \
    --platform managed \
    --region us-central1 \
    --allow-unauthenticated \
    --set-env-vars PRODUCTION=true
```

***Nota:*** Hasta aquí hemos desplegado la API, pero para hacer la demo fácil y enfocarnos en solo el despliegue heos usado el parámetro --allow-unauthenticated el cual deja totalmente expueto tu servicio al público, asi que no uses esa opción para una aplicación en producción.

## Próximos pasos

[Crea un API Gateway para exponer los endpoints de tu servicio](api-gateway-deployment.md)

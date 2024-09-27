# Instrucciones para crear un Api Gateway de GCP para exponer el API creado y desplegado en Cloud Run

## Antes de Iniciar

Recuerda que debes ejecutar los pasos de los instructivos anteriores:

- [CRear el API de demo y preparar la base de datos](../README.MD)
- [Desplegar el API en GCP Cloud Run](./cloud-run-deployment.md)

## Pasos para crear y configurar el Api Gateway

Resumen de los pasos a ejecutar:

- Habilitar algunas APIs de GCP.
- Crear una cuenta de servicio con la que el Api Gateway
- Otorgar permisos a la cuenta de servicio con permisos para invocar el Cloud Run.
- Crear la configuración basada en una definición Open Api.
- Crear el APi Gateway basado en la configuración creada en el paso anterior.

1. Habilitar Apis

```bash
gcloud services enable apigateway.googleapis.com
gcloud services enable servicemanagement.googleapis.com
gcloud services enable servicecontrol.googleapis.com
```

2. Crear una Cuenta de Servicio (Service Account)

```bash
gcloud iam service-accounts create mi-api-gateway-sa --display-name="Mi API Gateway Service Account"
```

3. Otorgar permisos *roles/run.invoker* al Api gatway para que pueda ejecutar el endpoint de Cloud Run

*Nota:* en el siguiente comando se usa serviceAccount:mi-api-gateway-sa@demo-cloud-run.iam.gserviceaccount.com la cual es está compuesta por:
serviceAccount:[NOMBRE_SERVICE_ACCOUNT_CREADO]@[ID_PROYECTO_GCP].iam.gserviceaccount.com

```bash
gcloud projects add-iam-policy-binding demo-cloud-run \
  --member="serviceAccount:mi-api-gateway-sa@demo-cloud-run.iam.gserviceaccount.com" \
  --role="roles/run.invoker"
```

4. Crear la configuración de API

```bash
gcloud api-gateway api-configs create mi-products-api-config \
  --api=jrx-products-api-gateway \
  --openapi-spec=./gcp/hapi-products-api-demo-swagger.json \
  --backend-auth-service-account=mi-api-gateway-sa@demo-cloud-run.iam.gserviceaccount.com \
  --project=demo-cloud-run
```

5. Crear el Api Gateway

```bash
gcloud api-gateway gateways create products-api-gateway \
  --api=products-api-gateway \
  --api-config=mi-products-api-config \
  --location=us-central1 \
  --project=jrx-demo-cloud-run
```

6. Verificar el estado

```bash
gcloud api-gateway gateways describe products-api-gateway \
  --location=us-central1 \
  --project=demo-cloud-run
```

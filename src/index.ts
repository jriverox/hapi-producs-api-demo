import dotenv from 'dotenv'
import * as Hapi from '@hapi/hapi';
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import HapiSwagger from 'hapi-swagger';
import Pack from '../package.json';
import { productRoutes } from './routes/product.route';
import { contextServerMiddleware, responseHeadersMiddleware } from './middleware/context';
import { HealthPlugin } from 'hapi-k8s-health'
import { AppDataSource } from './utils/appDataSource'

dotenv.config()

const init = async () => {
  await AppDataSource.initialize()

  const server = Hapi.server({
    port: process.env.PORT || 8080,
    host: '0.0.0.0'
  });

  const swaggerOptions = {
    info: {
        title: 'API Documentation',
        version: Pack.version,
    },
  };
  
  // Registra el path /liveness y /readiness para que se puedan hacer pruebas de salud
  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    },
    {
      plugin: HealthPlugin,
      options: {
        livenessProbes: {
          status: () => Promise.resolve('OK')
        },
        readinessProbes: {
          // Implementación del rediness según corresponda
          //service: () => Promise.resolve('OK')
        }
      }
    },
  ]);

  // Contexto de la aplicación
  contextServerMiddleware(server);
  // Headers de respuesta
  responseHeadersMiddleware(server);
  // Inicia los routes
  productRoutes(server);
  // Inicia el servidor
  await server.start();
  console.info(`[person] Server running on ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

init();

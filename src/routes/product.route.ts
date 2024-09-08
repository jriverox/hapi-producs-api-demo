import { Server } from "@hapi/hapi";
import * as productController from '../controllers/product.controller';
import { productSchema } from '../schemas/product.schema'

export const productRoutes = (server: Server) => {
  // Definicion de los routes
  server.route({
    method: 'GET',
    path: '/products/{id}',
    handler: productController.getById
  });

  server.route({
    method: 'GET',
    path: '/products',
    handler: productController.getAll
  });
  
  server.route({
    method: 'POST',
    path: '/products',
    handler: productController.create,
    options: {
      validate: {
          payload: productSchema
      }
  }
  })
};

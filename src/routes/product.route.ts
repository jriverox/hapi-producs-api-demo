import { Server } from "@hapi/hapi";
import * as productController from '../controllers/product.controller';
import { productSchema } from '../schemas/product.schema'

export const productRoutes = (server: Server) => {
  // Definicion de los routes
  server.route({
    method: 'GET',
    path: '/products/{id}',
    handler: productController.getById,
    options: {
      description: 'Gets a product by the id',
      notes: 'Returns a product by the id passed in the path',
      tags: ['api'], // Necesario para que aparezca en la documentación de Swagger
    }
  });

  server.route({
    method: 'GET',
    path: '/products',
    handler: productController.getAll,
    options: {
      description: 'Gets all products',
      notes: 'Returns all products',
      tags: ['api'], // Necesario para que aparezca en la documentación de Swagger
    }
  });
  
  server.route({
    method: 'POST',
    path: '/products',
    handler: productController.create,
    options: {
      description: 'Creates a new product',
      notes: 'Returns the created product',
      tags: ['api'], // Necesario para que aparezca en la documentación de Swagger
      validate: {
          payload: productSchema,
      }
    }
  })
};

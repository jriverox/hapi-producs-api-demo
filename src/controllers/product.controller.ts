import { Request, ResponseToolkit } from '@hapi/hapi';
import * as Boom from '@hapi/boom';
import * as productService from '../services/product.service';
import { ProductEntity } from '../entities/product.entity';
import { getLogger } from '../utils/logger';
import { Context, ContextRequestApplicationState } from '../middleware/context';
import { productSchema } from '../schemas/product.schema'
import { ProductModel } from '../models/product.model';

export const getById = async (request: Request, h: ResponseToolkit) => {
    const ctx = getContext(request);
    const id = parseInt(request.params.id, 10);
    try {
        getLogger(ctx).debug("Inicio del metodo getById");
        const person = await productService.getById(ctx, id);
        if (!person) {
            return Boom.notFound(`Person with ID ${id} not found`);
        }
        return h.response(person);
    } catch(error: any) {
        getLogger(ctx).error(error);
        const e = Boom.internal("Error interno");
        e.output.payload.message = 'Mensaje de error';
        return e;
    }
}

export const getAll = async (request: Request, h: ResponseToolkit) => {
    const ctx = getContext(request);
    try {
        getLogger(ctx).debug("Inicio del metodo getAll");
        const people = await productService.getAll(ctx);
        return h.response(people);
    } catch(error: any) {
        getLogger(ctx).error(error);
        const e = Boom.internal("Error interno");
        e.output.payload.message = 'Mensaje de error';
        return e;
    }
}

export const create = async (request: Request, h: ResponseToolkit) => {
    const ctx = getContext(request);

    try {
        getLogger(ctx).debug("Inicio del metodo create");
        const personData = request.payload as Partial<ProductModel>;
        const createdPerson = await productService.create(ctx, personData);
        return h.response(createdPerson).code(201);
    } catch (error: any) {
        getLogger(ctx).error(error);
        if (error.isJoi) {
            // Si es un error de validación, devolver un error 400 (Bad Request)
            return Boom.badRequest(error.details[0].message);
        } else if (error.cause === 'CODE_ALREADY_EXISTS') {
            // Si es un error de negocio, devolver un error 409 (Conflict)
            return Boom.conflict(error.message);
        }
        
        const e = Boom.internal("Error intentando crear a la persona");
        e.output.payload.message = error.message;
        return e;
    }
}

const getContext = (request: Request): Context => {
    return (request.app as ContextRequestApplicationState).context;
}
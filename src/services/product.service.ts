import { ProductEntity } from '../entities/product.entity';
import { getLogger } from '../utils/logger';
import { Context } from '../middleware/context';
import { AppDataSource } from '../utils/appDataSource'
import { ProductModel } from '../models/product.model';
import { Mapper } from '../utils/mapper';

const productRepository = AppDataSource.getRepository(ProductModel);
const mapper = new Mapper();


export const getById = async (ctx: Context, id: number): Promise<ProductEntity | null> => {
    const logger = getLogger(ctx);

    const productModel = await productRepository.findOne({
        where: { id: id}
    });
    if (!productModel) {
        logger.info(`No se encontró una persona con el ID: ${id}`);
        return null;
    }
    return mapper.map<ProductModel,ProductEntity>(productModel, new ProductEntity())
}

export const getAll = async (ctx: Context): Promise<ProductEntity[]> => {
    // Lógica
    
    const products = await productRepository.find();
    
    return mapper.mapCollection<ProductModel,ProductEntity>(products, new ProductEntity())
}

export const create = async (ctx: Context, productData: Partial<ProductModel>): Promise<ProductEntity> => {
    const newProduct = productRepository.create(productData);
    newProduct.creationDate = new Date();
    const foundProduct = await productRepository.findOne({ where: { code: newProduct.code } });
    if (foundProduct) {
        getLogger(ctx).warn(`El producto con código ${newProduct.code} ya existe`);
        throw new Error(`El producto con código ${newProduct.code} ya existe`, { cause: 'CODE_ALREADY_EXISTS' });
    }
    const savedProduct = await productRepository.save(newProduct);
    getLogger(ctx).debug(`save: ${JSON.stringify(savedProduct)}`);
    return mapper.map<ProductModel, ProductEntity>(savedProduct, new ProductEntity());
}

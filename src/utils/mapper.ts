import { TypeMapper } from "ts-mapper";
import { ProductModel } from '../models/product.model';
import { ProductEntity } from '../entities/product.entity';

export class Mapper extends TypeMapper {
   constructor() {
      super();
      this.config();
   }
 
   private config(): void {
      // From PersonModel to PersonEntity
      this.createMap<ProductModel, ProductEntity>()
      .map(src => src.id, dest => dest.id)
      .map(src => src.code, dest => dest.code)
      .map(src => src.name, dest => dest.name)
      .map(src => src.description, dest => dest.description)
      .map(src => src.price, dest => dest.price)
      .map(src => src.category, dest => dest.category)
      .map(src => src.stock, dest => dest.stock)
      .map(src => src.creationDate, dest => dest.creationDate)
      .map(src => src.company, dest => dest.company)
      .map(src => src.companyEmail, dest => dest.companyEmail)
      .map(src => src.originCountry, dest => dest.originCountry);

      // From PersonEntity to PersonModel
      this.createMap<ProductModel, ProductEntity>()
      .map(src => src.id, dest => dest.id)
      .map(src => src.code, dest => dest.code)
      .map(src => src.name, dest => dest.name)
      .map(src => src.description, dest => dest.description)
      .map(src => src.price, dest => dest.price)
      .map(src => src.category, dest => dest.category)
      .map(src => src.stock, dest => dest.stock)
      .map(src => src.creationDate, dest => dest.creationDate)
      .map(src => src.company, dest => dest.company)
      .map(src => src.companyEmail, dest => dest.companyEmail)
      .map(src => src.originCountry, dest => dest.originCountry);

  }
}
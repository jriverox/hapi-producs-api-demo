import "reflect-metadata"
import { DataSource } from "typeorm"
import { ProductModel } from "../models/product.model"
import { 
  DB_DATABASE, 
  DB_HOST, 
  DB_LOGGING, 
  DB_PASSWORD, 
  DB_PORT, 
  DB_SYNCHRONIZE, 
  DB_USERNAME } from "./environment";

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USERNAME,  
    password: DB_PASSWORD,
    database: DB_DATABASE,
    synchronize: DB_SYNCHRONIZE,
    logging: DB_LOGGING,
    entities: [ProductModel],
  });
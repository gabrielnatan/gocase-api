import { Uuid } from "../../../@sahred/domain/value-object/uuid/uuid.entity.js";
import { IRepository } from "../../../@sahred/repository/repository.interface.js";
import { Product } from "../entity/product.entity.js";

export interface IProductRepository extends IRepository<Product, Uuid> {
    findBySku(sku: string): Promise<Product | null>;
    findByCategory(category: string): Promise<Product[]>;
}

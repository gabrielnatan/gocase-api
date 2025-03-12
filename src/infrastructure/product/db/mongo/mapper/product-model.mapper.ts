import { Uuid } from "../../../../../@sahred/domain/value-object/uuid/uuid.entity.js";
import { Product } from "../../../../../domain/product/entity/product.entity.js";
import { IProduct, ProductModel } from "../model/product.model.js";

export class ProductModelMapper {
    static toModel(entity: Product): IProduct {
        return new ProductModel({
            id: entity.id.id,
            name: entity.name,
            description: entity.description,
            category: entity.category,
            price: entity.price,
            stock: entity.stock,
            sku: entity.sku,
            images: entity.images,
            created_at: entity.created_at,
            updated_at: entity.updated_at,
            deleted_at: entity.deleted_at,
        });
    }

    static toEntity(model: IProduct): Product {
        return new Product({
            id: new Uuid(model.id),
            name: model.name,
            description: model.description,
            category: model.category,
            price: model.price,
            stock: model.stock,
            sku: model.sku,
            images: model.images,
            created_at: model.created_at,
            updated_at: model.updated_at,
            deleted_at: model.deleted_at,
        });
    }
}

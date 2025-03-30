import { Uuid } from "../../../../../@sahred/domain/value-object/uuid/uuid.entity.js";
import { ProductCategory } from "../../../../../domain/product_category/entity/product_category.entity.js";
import { IProductCategory, ProductCategoryModel } from "../model/product.model.js";

export class ProductCategoryModelMapper {
  static toModel(entity: ProductCategory): IProductCategory {
    return new ProductCategoryModel({
      id: entity.id.id,
      name: entity.name,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
      deleted_at: entity.deleted_at,
    });
  }

  static toEntity(model: IProductCategory): ProductCategory {
    return new ProductCategory({
      id: new Uuid(model.id),
      name: model.name,
      created_at: model.created_at,
      updated_at: model.updated_at,
      deleted_at: model.deleted_at,
    });
  }
}

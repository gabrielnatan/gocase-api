import { Uuid } from "../../../../../@sahred/domain/value-object/uuid/uuid.entity.js";
import { ProductCategory } from "../../../../../domain/product_category/entity/product_category.entity.js";
import { IProductCategoryRepository } from "../../../../../domain/product_category/repository/product.repository.interface.js";
import { ProductCategoryModelMapper } from "../mapper/product-model.mapper.js";
import { ProductCategoryModel } from "../model/product.model.js";

export class ProductCategoryRepository implements IProductCategoryRepository {
  constructor(private model = ProductCategoryModel) {}

  async insert(entity: ProductCategory): Promise<void> {
    const model = ProductCategoryModelMapper.toModel(entity);
    await this.model.create(model);
  }

  async update(entity: ProductCategory): Promise<void> {
    await this.model.updateOne(
      { id: entity.id.id },
      {
        name: entity.name,
        updated_at: new Date(),
      }
    );
  }

  async delete(entityId: Uuid): Promise<void> {
    await this.model.updateOne(
      { id: entityId.id },
      { deleted_at: new Date() }
    );
  }

  async findById(entityId: Uuid): Promise<ProductCategory | null> {
    const model = await this.model.findOne({ id: entityId.id, deleted_at: null });
    return model ? ProductCategoryModelMapper.toEntity(model) : null;
  }

  async findAll(): Promise<ProductCategory[]> {
    const models = await this.model.find({ deleted_at: null });
    return models.map(ProductCategoryModelMapper.toEntity);
  }
}

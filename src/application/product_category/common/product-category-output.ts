import { ProductCategory } from "../../../domain/product_category/entity/product_category.entity.js";

export type ProductCategoryOutput = {
  id: string;
  name: string;
  created_at: Date;
  updated_at?: Date | null;
  deleted_at?: Date | null;
};

export class ProductCategoryOutputMapper {
  static toOutput(entity: ProductCategory): ProductCategoryOutput {
    const { id, name, created_at, updated_at, deleted_at } = entity.toJSON();

    return {
      id: id.id,
      name,
      created_at,
      updated_at,
      deleted_at,
    };
  }
}

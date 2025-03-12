import { Product } from "../../../domain/product/entity/product.entity.js";

export type ProductOutput = {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  sku: string;
  images: string[];
  created_at: Date;
  updated_at?: Date | null;
  deleted_at?: Date | null;
};

export class ProductOutputMapper {
  static toOutput(entity: Product): ProductOutput {
    const {
      id,
      name,
      description,
      category,
      price,
      stock,
      sku,
      images,
      created_at,
      updated_at,
      deleted_at,
    } = entity.toJSON();
    
    return {
      id: id.id,
      name,
      description,
      category,
      price,
      stock,
      sku,
      images,
      created_at,
      updated_at,
      deleted_at,
    };
  }
}

import { IUseCase } from "../../../@sahred/application/use-case.interface.js";
import { Uuid } from "../../../@sahred/domain/value-object/uuid/uuid.entity.js";
import { IProductCategoryRepository } from "../../../domain/product_category/repository/product.repository.interface.js";
import { ProductCategoryOutput, ProductCategoryOutputMapper } from "../common/product-category-output.js";

export class UpdateProductCategoryUseCase implements IUseCase<UpdateProductCategoryInput, UpdateProductCategoryOutput> {
  constructor(private readonly categoryRepo: IProductCategoryRepository) {}

  async execute(input: UpdateProductCategoryInput): Promise<ProductCategoryOutput> {
    const uuid = new Uuid(input.id);
    const category = await this.categoryRepo.findById(uuid);

    if (!category) {
      throw new Error("Product category does not exist.");
    }

    if (input.name !== undefined) {
      category.changeName(input.name);
    }

    await this.categoryRepo.update(category);
    return ProductCategoryOutputMapper.toOutput(category);
  }
}

export interface UpdateProductCategoryInput {
  id: string;
  name?: string;
}

export type UpdateProductCategoryOutput = ProductCategoryOutput;

import { IUseCase } from "../../../@sahred/application/use-case.interface.js";
import { Uuid } from "../../../@sahred/domain/value-object/uuid/uuid.entity.js";
import { IProductCategoryRepository } from "../../../domain/product_category/repository/product.repository.interface.js";
import { ProductCategoryOutput, ProductCategoryOutputMapper } from "../common/product-category-output.js";

export class GetProductCategoryUseCase implements IUseCase<GetProductCategoryInput, ProductCategoryOutput> {
  constructor(private readonly categoryRepo: IProductCategoryRepository) {}

  async execute(input: GetProductCategoryInput): Promise<ProductCategoryOutput> {
    const uuid = new Uuid(input.id);
    const category = await this.categoryRepo.findById(uuid);

    if (!category) {
      throw new Error("Category not exists");
    }

    return ProductCategoryOutputMapper.toOutput(category);
  }
}

interface GetProductCategoryInput {
  id: string;
}

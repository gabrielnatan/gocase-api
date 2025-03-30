import { IUseCase } from "../../../@sahred/application/use-case.interface.js";
import { ProductCategory } from "../../../domain/product_category/entity/product_category.entity.js";
import { IProductCategoryRepository } from "../../../domain/product_category/repository/product.repository.interface.js";
import { ProductCategoryOutput, ProductCategoryOutputMapper } from "../common/product-category-output.js";

export class CreateProductCategoryUseCase implements IUseCase<CreateProductCategoryInput, ProductCategoryOutput> {
  constructor(private readonly categoryRepo: IProductCategoryRepository) {}

  async execute(input: CreateProductCategoryInput): Promise<ProductCategoryOutput> {
    const entity = ProductCategory.create({
      name: input.name,
    });

    await this.categoryRepo.insert(entity);
    return ProductCategoryOutputMapper.toOutput(entity);
  }
}

interface CreateProductCategoryInput {
  name: string;
}

type CreateProductCategoryOutput = ProductCategoryOutput;

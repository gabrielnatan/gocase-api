import { IUseCase } from "../../../@sahred/application/use-case.interface.js";
import { Uuid } from "../../../@sahred/domain/value-object/uuid/uuid.entity.js";
import { IProductCategoryRepository } from "../../../domain/product_category/repository/product.repository.interface.js";
import { ProductCategoryOutput, ProductCategoryOutputMapper } from "../common/product-category-output.js";

export class ListProductCategoryUseCase implements IUseCase<{ id: string }, ProductCategoryOutput[]> {
    constructor(private readonly categoryRepo: IProductCategoryRepository) {}
  
    async execute({ id }: { id: string }): Promise<ProductCategoryOutput[]> {
      const categories = await this.categoryRepo.findAll(new Uuid(id));
      return categories?.map(ProductCategoryOutputMapper.toOutput) ?? [];
    }
  }

export type ListProductCategoryOutput = ListProductCategoryOutput[];

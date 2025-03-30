import { IUseCase } from "../../../@sahred/application/use-case.interface.js";
import { Uuid } from "../../../@sahred/domain/value-object/uuid/uuid.entity.js";
import { IProductCategoryRepository } from "../../../domain/product_category/repository/product.repository.interface.js";

export class DeleteProductCategoryUseCase implements IUseCase<DeleteProductCategoryInput, DeleteProductCategoryOutput> {
  constructor(private readonly categoryRepo: IProductCategoryRepository) {}

  async execute(input: DeleteProductCategoryInput): Promise<DeleteProductCategoryOutput> {
    const uuid = new Uuid(input.id);
    await this.categoryRepo.delete(uuid);
    return { success: true };
  }
}

interface DeleteProductCategoryInput {
  id: string;
}

type DeleteProductCategoryOutput = { success: boolean };

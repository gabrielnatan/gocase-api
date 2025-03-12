import { IUseCase } from "../../../@sahred/application/use-case.interface.js";
import { Uuid } from "../../../@sahred/domain/value-object/uuid/uuid.entity.js";
import { IProductRepository } from "../../../domain/product/repository/product.repository.interface.js";

export class DeleteProductUseCase implements IUseCase<DeleteProductUseCaseInput, DeleteProductUseCaseOutput> {
    constructor(private readonly productRepo: IProductRepository) {}

    async execute(input: DeleteProductUseCaseInput): Promise<DeleteProductUseCaseOutput> {
        const uuid = new Uuid(input.id);
        await this.productRepo.delete(uuid);
        return { success: true };
    }
}

interface DeleteProductUseCaseInput {
    id: string;
}

type DeleteProductUseCaseOutput = { success: boolean };

import { IUseCase } from "../../../@sahred/application/use-case.interface.js";
import { Uuid } from "../../../@sahred/domain/value-object/uuid/uuid.entity.js";
import { IProductRepository } from "../../../domain/product/repository/product.repository.interface.js";
import { ProductOutput, ProductOutputMapper } from "../common/product-output.js";

export class GetProductUseCase implements IUseCase<GetProductInput, GetProductOutput> {
    constructor(private readonly productRepo: IProductRepository) {}

    async execute(input: GetProductInput): Promise<GetProductOutput> {
        const uuid = new Uuid(input.id);
        const product = await this.productRepo.findById(uuid);
        
        if (!product) {
            throw new Error("Product not exists");
        }

        return ProductOutputMapper.toOutput(product);
    }
}

interface GetProductInput {
    id: string;
}

type GetProductOutput = ProductOutput;

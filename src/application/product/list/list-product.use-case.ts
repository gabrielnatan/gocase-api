import { IUseCase } from "../../../@sahred/application/use-case.interface.js";
import { Uuid } from "../../../@sahred/domain/value-object/uuid/uuid.entity.js";
import { IProductRepository } from "../../../domain/product/repository/product.repository.interface.js";
import { ProductOutput, ProductOutputMapper } from "../common/product-output.js";

export class ListProductUseCase implements IUseCase<ListProductInput, ListProductOutput> {
    constructor(private readonly productRepo: IProductRepository) {}

    async execute(input: ListProductInput): Promise<ListProductOutput> {
        const products = await this.productRepo.findAll(new Uuid(input.user_id));
        return products ? products.map(ProductOutputMapper.toOutput) : [];
    }
}

export interface ListProductInput {
    user_id: string;
}

export type ListProductOutput = ProductOutput[];

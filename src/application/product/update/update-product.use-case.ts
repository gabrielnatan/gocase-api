import { IUseCase } from "../../../@sahred/application/use-case.interface.js";
import { Uuid } from "../../../@sahred/domain/value-object/uuid/uuid.entity.js";
import { IProductRepository } from "../../../domain/product/repository/product.repository.interface.js";
import { ProductOutput, ProductOutputMapper } from "../common/product-output.js";

export class UpdateProductUseCase implements IUseCase<UpdateProductInput, UpdateProductOutput> {
    constructor(private readonly productRepo: IProductRepository) {}

    async execute(input: UpdateProductInput): Promise<ProductOutput> {
        const uuid = new Uuid(input.id);
        const product = await this.productRepo.findById(uuid);

        if (!product) {
            throw new Error("Product does not exist.");
        }

        if (input.name !== undefined) {
            product.changeName(input.name);
        }
        if (input.description !== undefined) {
            product.changeDescription(input.description);
        }
        if (input.category !== undefined) {
            product.changeCategory(input.category);
        }
        if (input.price !== undefined) {
            product.changePrice(input.price);
        }
        if (input.stock !== undefined) {
            product.changeStock(input.stock);
        }
        if (input.sku !== undefined) {
            product.changeSku(input.sku);
        }
        if (input.images !== undefined) {
            product.changeImages(input.images);
        }

        await this.productRepo.update(product);

        return ProductOutputMapper.toOutput(product);
    }
}

export interface UpdateProductInput {
    id: string;
    name?: string;
    description?: string;
    category?: string;
    price?: number;
    stock?: number;
    sku?: string;
    images?: string[];
}

export type UpdateProductOutput = ProductOutput;

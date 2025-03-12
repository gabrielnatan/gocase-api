import { IUseCase } from "../../../@sahred/application/use-case.interface.js";
import { Product } from "../../../domain/product/entity/product.entity.js";
import { IProductRepository } from "../../../domain/product/repository/product.repository.interface.js";
import { ProductOutput, ProductOutputMapper } from "../common/product-output.js";

export class CreateProductUseCase implements IUseCase<CreateProductUseCaseInput, CreateProductUseCaseOutput> {
    constructor(private readonly productRepo: IProductRepository) {}

    async execute(input: CreateProductUseCaseInput): Promise<ProductOutput> {
        const { name, description, category, price, stock, sku, images } = input;
        
        const entity = new Product({
            name,
            description,
            category,
            price,
            stock,
            sku,
            images,
            created_at: new Date(),
        });

        console.log("ENTITY ", entity);
        await this.productRepo.insert(entity);
        return ProductOutputMapper.toOutput(entity);
    }
}

interface CreateProductUseCaseInput {
    name: string;
    description: string;
    category: string;
    price: number;
    stock: number;
    sku: string;
    images: string[];
}

type CreateProductUseCaseOutput = ProductOutput;

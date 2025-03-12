import { Uuid } from "../../../../../@sahred/domain/value-object/uuid/uuid.entity.js";
import { Product } from "../../../../../domain/product/entity/product.entity.js";
import { IProductRepository } from "../../../../../domain/product/repository/product.repository.interface.js";
import { ProductModelMapper } from "../mapper/product-model.mapper.js";
import { IProduct, ProductModel } from "../model/product.model.js";

export class ProductRepository implements IProductRepository {

    constructor(private productModel = ProductModel) {}

    async insert(entity: Product): Promise<void> {
        console.log("INSERT PRODUCT: ", entity);
        const product = ProductModelMapper.toModel(entity);
        await this.productModel.create(product);
    }

    async delete(entityId: Uuid): Promise<void> {
        await this.productModel.updateOne(
            { id: entityId.id },  
            { deleted_at: new Date() }
        );
    }

    async update(entity: Product): Promise<void> {
        const modelProps = ProductModelMapper.toModel(entity);

        await this.productModel.updateOne(
            { id: entity.id.id },
            { 
                name: modelProps.name,
                description: modelProps.description,
                category: modelProps.category,
                price: modelProps.price,
                stock: modelProps.stock,
                sku: modelProps.sku,
                images: modelProps.images,
                created_at: modelProps.created_at,
                updated_at: new Date(),
                deleted_at: modelProps.deleted_at,
            }
        );
    }

    async findById(entityId: Uuid): Promise<Product | null> {
        const model = await this.productModel.findOne({ 
            id: entityId.toString(),
            deleted_at: null
        });
         
        return model ? ProductModelMapper.toEntity(model) : null;
    }

    async findAll(): Promise<Product[]> {
        const models = await this.productModel.find({ deleted_at: null });
        return models.map((product: IProduct) => ProductModelMapper.toEntity(product));
    }

    async findBySku(sku: string): Promise<Product | null> {
        const model = await this.productModel.findOne({ sku, deleted_at: null });
        return model ? ProductModelMapper.toEntity(model) : null;
    }

    async findByCategory(category: string): Promise<Product[]> {
        const models = await this.productModel.find({ category, deleted_at: null });
        return models.map((product: IProduct) => ProductModelMapper.toEntity(product));
    }
}

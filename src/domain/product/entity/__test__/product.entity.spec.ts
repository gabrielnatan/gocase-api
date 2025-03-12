import { beforeAll, describe, expect, it } from 'vitest';
import { Product, ProductProps } from '../product.entity.js';
import { Uuid } from '../../../../@sahred/domain/value-object/uuid/uuid.entity.js';

describe('[Product entity]', () => {
    let mockProduct: ProductProps;

    beforeAll(() => {
        const uuid = new Uuid();
        mockProduct = {
            id: uuid,
            name: "Capinha de Skate",
            description: "Capinha estilosa e resistente inspirada no lifestyle do skate.",
            category: "Acessórios para Celular",
            price: 49.90,
            stock: 100,
            sku: "GC-SKATE-5870",
            images: [
                "https://exemplo.com/capinha-skate-1.jpg",
                "https://exemplo.com/capinha-skate-2.jpg"
            ],
            created_at: new Date(),
            updated_at: undefined,
            deleted_at: undefined
        };
    });

    it("should create a Product", () => {
        const product = new Product(mockProduct);

        expect(product).toBeInstanceOf(Product);
        expect(product.id).toBe(mockProduct.id);
        expect(product.name).toBe(mockProduct.name);
        expect(product.description).toBe(mockProduct.description);
        expect(product.category).toBe(mockProduct.category);
        expect(product.price).toBe(mockProduct.price);
        expect(product.stock).toBe(mockProduct.stock);
        expect(product.sku).toBe(mockProduct.sku);
        expect(product.images).toStrictEqual(mockProduct.images);
    });

    it("should create a Product with the static create method", () => {
        const product = Product.create(mockProduct);

        expect(product).toBeInstanceOf(Product);
        expect(product.id).toBe(mockProduct.id);
        expect(product.name).toBe(mockProduct.name);
        expect(product.description).toBe(mockProduct.description);
        expect(product.category).toBe(mockProduct.category);
        expect(product.price).toBe(mockProduct.price);
        expect(product.stock).toBe(mockProduct.stock);
        expect(product.sku).toBe(mockProduct.sku);
        expect(product.images).toStrictEqual(mockProduct.images);
        expect(product.id).toBeInstanceOf(Uuid);
    });

    it("should return a JSON representation of the Product", () => {
        const product = new Product(mockProduct);

        expect(product.toJSON()).toStrictEqual({
            id: product.id,
            name: product.name,
            description: product.description,
            category: product.category,
            price: product.price,
            stock: product.stock,
            sku: product.sku,
            images: product.images,
            created_at: product.created_at,
            updated_at: product.updated_at,
            deleted_at: product.deleted_at,
        });
    });

    it("should create a Product and generate an ID if not provided", () => {
        const product = new Product(mockProduct);

        expect(product).toBeInstanceOf(Product);
        expect(product.id).toBeDefined();
        expect(product.id).toBeInstanceOf(Uuid);
    });

    it("should update the product name", () => {
        const product = new Product(mockProduct);
        product.changeName("Capinha de Surf");

        expect(product.name).toBe("Capinha de Surf");
    });

    it("should update the product description", () => {
        const product = new Product(mockProduct);
        product.changeDescription("Nova capinha resistente inspirada no surf.");

        expect(product.description).toBe("Nova capinha resistente inspirada no surf.");
    });

    it("should update the product category", () => {
        const product = new Product(mockProduct);
        product.changeCategory("Capinhas para Celular");

        expect(product.category).toBe("Capinhas para Celular");
    });

    it("should update the product price", () => {
        const product = new Product(mockProduct);
        product.changePrice(59.90);

        expect(product.price).toBe(59.90);
    });

    it("should update the product stock", () => {
        const product = new Product(mockProduct);
        product.changeStock(200);

        expect(product.stock).toBe(200);
    });

    it("should update the product SKU", () => {
        const product = new Product(mockProduct);
        product.changeSku("GC-SURF-7841");

        expect(product.sku).toBe("GC-SURF-7841");
    });

    it("should update the product images", () => {
        const product = new Product(mockProduct);
        const newImages = [
            "https://exemplo.com/capinha-surf-1.jpg",
            "https://exemplo.com/capinha-surf-2.jpg"
        ];
        product.changeImages(newImages);

        expect(product.images).toStrictEqual(newImages);
    });
});

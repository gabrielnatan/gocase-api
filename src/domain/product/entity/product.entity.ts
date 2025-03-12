import { Entity } from "../../../@sahred/domain/entity/entity.js";
import { Uuid } from "../../../@sahred/domain/value-object/uuid/uuid.entity.js";
import { ValueObject } from "../../../@sahred/domain/value-object/value-object.js";

export type ProductProps = {
    id?: Uuid;
    name: string;
    description: string;
    category: string;
    price: number;
    stock: number;
    sku: string;
    images: string[];
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
};

export class Product extends Entity {
    id: Uuid;
    name: string;
    description: string;
    category: string;
    price: number;
    stock: number;
    sku: string;
    images: string[];
    created_at: Date;
    updated_at?: Date;
    deleted_at?: Date;

    constructor({
        id,
        name,
        description,
        category,
        price,
        stock,
        sku,
        images,
        created_at,
        updated_at,
        deleted_at,
    }: ProductProps) {
        super();
        this.id = id ?? new Uuid();
        this.name = name;
        this.description = description;
        this.category = category;
        this.price = price;
        this.stock = stock;
        this.sku = sku;
        this.images = images;
        this.created_at = created_at ?? new Date();
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
    }

    changeName(name: string) {
        this.name = name;
        this.updated_at = new Date();
    }

    changeDescription(description: string) {
        this.description = description;
        this.updated_at = new Date();
    }

    changeCategory(category: string) {
        this.category = category;
        this.updated_at = new Date();
    }

    changePrice(price: number) {
        this.price = price;
        this.updated_at = new Date();
    }

    changeStock(stock: number) {
        this.stock = stock;
        this.updated_at = new Date();
    }

    changeSku(sku: string) {
        this.sku = sku;
        this.updated_at = new Date();
    }

    changeImages(images: string[]) {
        this.images = images;
        this.updated_at = new Date();
    }

    static create(props: ProductProps) {
        return new Product(props);
    }

    get entity_id(): ValueObject {
        return this.id;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            category: this.category,
            price: this.price,
            stock: this.stock,
            sku: this.sku,
            images: this.images,
            created_at: this.created_at,
            updated_at: this.updated_at,
            deleted_at: this.deleted_at,
        };
    }
}

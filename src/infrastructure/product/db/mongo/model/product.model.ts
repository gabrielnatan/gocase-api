import mongoose, { Document, Model, Schema } from "mongoose";
import { Uuid } from "../../../../../@sahred/domain/value-object/uuid/uuid.entity.js";

export interface IProduct extends Document {
    id: string;
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
}

const ProductSchema: Schema = new Schema<IProduct>({
    id: { 
        type: String, 
        required: true, 
        unique: true,
        default: () => new Uuid().id,
        validate: {
          validator: function(v: string) {
            return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v);
          },
          message: (props) => `${props.value} não é um UUID válido!`
        }
    },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    sku: { type: String, required: true, unique: true },
    images: { type: [String], required: true },
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date },
    deleted_at: { type: Date },
});

export const ProductModel: Model<IProduct> = mongoose.model<IProduct>(
  'Product',
  ProductSchema
);

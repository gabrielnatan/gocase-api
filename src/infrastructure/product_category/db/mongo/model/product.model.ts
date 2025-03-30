import mongoose, { Document, Model, Schema } from "mongoose";
import { Uuid } from "../../../../../@sahred/domain/value-object/uuid/uuid.entity.js";

export interface IProductCategory extends Document {
  id: string;
  name: string;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

const ProductCategorySchema: Schema = new Schema<IProductCategory>({
  id: {
    type: String,
    required: true,
    unique: true,
    default: () => new Uuid().id,
    validate: {
      validator: (v: string) =>
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v),
      message: (props) => `${props.value} não é um UUID válido!`,
    },
  },
  name: { type: String, required: true },
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date },
  deleted_at: { type: Date },
});

export const ProductCategoryModel: Model<IProductCategory> = mongoose.model<IProductCategory>(
  "ProductCategory",
  ProductCategorySchema
);

import { Entity } from "../../../@sahred/domain/entity/entity.js";
import { Uuid } from "../../../@sahred/domain/value-object/uuid/uuid.entity.js";
import { ValueObject } from "../../../@sahred/domain/value-object/value-object.js";

export type ProductCategoryProps = {
  id?: Uuid;
  name: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
};

export class ProductCategory extends Entity {
  id: Uuid;
  name: string;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;

  constructor({
    id,
    name,
    created_at,
    updated_at,
    deleted_at,
  }: ProductCategoryProps) {
    super();
    this.id = id ?? new Uuid();
    this.name = name;
    this.created_at = created_at ?? new Date();
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
  }

  static create(props: ProductCategoryProps): ProductCategory {
    return new ProductCategory(props);
  }

  changeName(name: string) {
    this.name = name;
    this.updated_at = new Date();
  }


  softDelete() {
    this.deleted_at = new Date();
  }

  get entity_id(): ValueObject {
    return this.id;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      created_at: this.created_at,
      updated_at: this.updated_at,
      deleted_at: this.deleted_at,
    };
  }
}

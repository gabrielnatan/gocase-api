import { beforeAll, describe, expect, it } from 'vitest';
import { ProductCategory, ProductCategoryProps } from '../product_category.entity.js';
import { Uuid } from '../../../../@sahred/domain/value-object/uuid/uuid.entity.js';

describe('[ProductCategory entity]', () => {
  let mockCategory: ProductCategoryProps;

  beforeAll(() => {
    const uuid = new Uuid();
    mockCategory = {
      id: uuid,
      name: "Capas para Celular",
      created_at: new Date(),
      updated_at: undefined,
      deleted_at: undefined,
    };
  });

  it("should create a ProductCategory", () => {
    const category = new ProductCategory(mockCategory);

    expect(category).toBeInstanceOf(ProductCategory);
    expect(category.id).toBe(mockCategory.id);
    expect(category.name).toBe(mockCategory.name);
    expect(category.created_at).toBeInstanceOf(Date);
  });

  it("should create a ProductCategory with the static create method", () => {
    const category = ProductCategory.create(mockCategory);

    expect(category).toBeInstanceOf(ProductCategory);
    expect(category.name).toBe(mockCategory.name);
    expect(category.id).toBeInstanceOf(Uuid);
  });

  it("should return a JSON representation of the ProductCategory", () => {
    const category = new ProductCategory(mockCategory);

    expect(category.toJSON()).toStrictEqual({
      id: category.id,
      name: category.name,
      created_at: category.created_at,
      updated_at: category.updated_at,
      deleted_at: category.deleted_at,
    });
  });

  it("should create a ProductCategory and generate an ID if not provided", () => {
    const category = ProductCategory.create({ name: "Mochilas" });

    expect(category).toBeInstanceOf(ProductCategory);
    expect(category.id).toBeDefined();
    expect(category.id).toBeInstanceOf(Uuid);
    expect(category.name).toBe("Mochilas");
  });

  it("should update the category name", () => {
    const category = new ProductCategory(mockCategory);
    category.changeName("Acessórios");

    expect(category.name).toBe("Acessórios");
    expect(category.updated_at).toBeInstanceOf(Date);
  });

  it("should soft delete the category", () => {
    const category = new ProductCategory(mockCategory);
    category.softDelete();

    expect(category.deleted_at).toBeInstanceOf(Date);
  });
});

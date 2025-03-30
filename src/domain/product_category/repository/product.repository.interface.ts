import { Uuid } from "../../../@sahred/domain/value-object/uuid/uuid.entity.js";
import { IRepository } from "../../../@sahred/repository/repository.interface.js";
import { ProductCategory } from "../entity/product_category.entity.js";

export interface IProductCategoryRepository extends IRepository<ProductCategory, Uuid> {}

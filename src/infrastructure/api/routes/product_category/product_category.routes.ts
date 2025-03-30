import express, { Request, Response } from "express";
import { GetProductCategoryUseCase } from "../../../../application/product_category/get/get-product-category.use-case.js";
import { ListProductCategoryUseCase } from "../../../../application/product_category/list/list-product-category.use-case.js";
import { DeleteProductCategoryUseCase } from "../../../../application/product_category/delete/delete-product-category.use-case.js";
import { ProductCategoryRepository } from "../../../product_category/db/mongo/repository/product.repository.js";
import { ProductCategoryModel } from "../../../product_category/db/mongo/model/product.model.js";
import { CreateProductCategoryUseCase } from "../../../../application/product_category/create/create-product-category-.use-case.js";
import { UpdateProductCategoryUseCase } from "../../../../application/product_category/update/update-product.use-case.js";

const productCategoryRouter = express.Router();

// Repository & UseCases
const categoryRepository = new ProductCategoryRepository(ProductCategoryModel);
const listCategoryUseCase = new ListProductCategoryUseCase(categoryRepository);
const getCategoryUseCase = new GetProductCategoryUseCase(categoryRepository);
const createCategoryUseCase = new CreateProductCategoryUseCase(categoryRepository);
const updateCategoryUseCase = new UpdateProductCategoryUseCase(categoryRepository);
const deleteCategoryUseCase = new DeleteProductCategoryUseCase(categoryRepository);

// Shared error handler
const handleError = (res: Response, error: unknown) => {
  if (error instanceof Error) {
    res.status(400).json({ message: error.message });
  } else {
    res.status(500).json({ message: "An unexpected error occurred." });
  }
};

// Routes
productCategoryRouter.get("/", async (req: Request, res: Response) => {
  try {
    const categories = await listCategoryUseCase.execute({ id: req.user.id as string});;
    res.json({ message: categories });
  } catch (error) {
    handleError(res, error);
  }
});

productCategoryRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await getCategoryUseCase.execute({ id });
    res.json({ message: category });
  } catch (error) {
    handleError(res, error);
  }
});

productCategoryRouter.post("/", async (req: Request, res: Response) => {
  try {
    const category = await createCategoryUseCase.execute(req.body);
    res.status(201).json({ message: category });
  } catch (error) {
    handleError(res, error);
  }
});

productCategoryRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await updateCategoryUseCase.execute({ id, ...req.body });
    res.json({ message: category });
  } catch (error) {
    handleError(res, error);
  }
});

productCategoryRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await deleteCategoryUseCase.execute({ id });
    res.json({ message: category });
  } catch (error) {
    handleError(res, error);
  }
});

export { productCategoryRouter };

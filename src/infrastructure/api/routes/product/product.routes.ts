import express, { Request, Response } from "express";
import { ProductModel } from "../../../product/db/mongo/model/product.model.js";
import { ListProductUseCase } from "../../../../application/product/list/list-product.use-case.js";
import { UpdateProductUseCase } from "../../../../application/product/update/update-product.use-case.js";
import { DeleteProductUseCase } from "../../../../application/product/delete/delete-product.use-case.js";
import { GetProductUseCase } from "../../../../application/product/get/get-product.use-case.js";
import { ProductRepository } from "../../../product/db/mongo/repository/product.repository.js";
import { CreateProductUseCase } from "../../../../application/product/create/create-product-.use-case.js";

const productRouter = express.Router();

const productRepository = new ProductRepository(ProductModel);
const getProductUseCase = new GetProductUseCase(productRepository);
const listProductUseCase = new ListProductUseCase(productRepository);
const createProductUseCase = new CreateProductUseCase(productRepository);
const updateProductUseCase = new UpdateProductUseCase(productRepository);
const deleteProductUseCase = new DeleteProductUseCase(productRepository);

const handleError = (res: Response, error: unknown) => {
    if (error instanceof Error) {
        res.status(400).json({ message: error.message });
    } else {
        res.status(500).json({ message: "An unexpected error occurred." });
    }
};

productRouter.get('/', async (req: Request, res: Response) => {
    try {
        const products = await listProductUseCase.execute({ user_id: req.user.id as string});
        res.json({ message: products });
    } catch (error) {
        handleError(res, error);
    }
});

productRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await getProductUseCase.execute({ id });
        res.json({ message: product });
    } catch (error) {
        handleError(res, error);
    }
});

productRouter.post('/', async (req: Request, res: Response) => {
    try {
        const productDTO = {
            ...req.body,
            user_id: req.user.id
        };

        const product = await createProductUseCase.execute(productDTO);
        res.status(201).json({ message: product });
    } catch (error) {
        handleError(res, error);
    }
});

productRouter.put('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const productDTO = { id, ...req.body };
        const product = await updateProductUseCase.execute(productDTO);
        res.json({ message: product });
    } catch (error) {
        handleError(res, error);
    }
});

productRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await deleteProductUseCase.execute({ id });
        res.json({ message: product });
    } catch (error) {
        handleError(res, error);
    }
});

export { productRouter };

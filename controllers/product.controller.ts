import { Response, Request } from "express";
import { createService, listByIdService, listByUserService, removeService, updateService } from "../service/product.service";




export const getProductsByUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;        
        let products = await listByUserService(userId);
        res.json(products);
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: error });
    }
};

export const getProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        let product = await listByIdService(id);
        res.json(product);
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: error });
    }
};

export const createProduct = async (req: Request, res: Response) => {
    try {
        let product = await createService(req.body);
        res.json(product);
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: error });
    }
};
export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        let product = await updateService(id, req.body);
        res.json(product);
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: error });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        let product = await removeService(id);
        res.json(product);
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: error });
    }
};
import { v4 as uuidv4 } from 'uuid';
import Product from '../models/product';
import User from '../models/user';


export const listByUserService = async (userId: string) => {
    const creatorUser = await User.findOne().where({ id: userId, active: true });
    const products = await Product.find().where({ active: true, creator: creatorUser });
    return products;

}
export const listByIdService = async (id: string) => {

    const product = await Product.findOne().where({ id, active: true });
    return product;

}
export const createService = async (productData: { name: string, description: string, image: string, creator: string }) => {

    const { name, description, image, creator } = productData;

    const creatorUser = await User.findOne().where({ id: creator, active: true });

    const product = new Product({ name, description, image, creator: creatorUser, id: uuidv4() });

    //Save in db
    return await product.save();

}
export const updateService = async (id: string, productData: { name: string, description: string, image: string }) => {
    const { name, description, image } = productData;
    const product = await Product.findOne().where({ id }).updateOne({ name, description, image });
    return product;

}
export const removeService = async (id: string) => {
    const product = await Product.findOne().where({ id }).updateOne({ active: false });
    return product;
}
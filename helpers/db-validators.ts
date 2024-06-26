import User from '../models/user';
import Product from '../models/product';


export const emailExists = async (email = '') => {

    // Check if the email exist
    const emailExists = await User.findOne({ email });
    if (emailExists) {
        throw new Error(`The email: ${email} is already registered`);
    }
}

export const UserExistsById = async (id: string) => {

    // Check if the user exist
    const userExists = await User.findOne().where({ id });
    if (!userExists) {
        throw new Error(`the id not exist ${id}`);
    }
}
export const ProductExistsById = async (id: string) => {

    // Check if the product exist
    const productExists = await Product.findOne().where({ id });
    if (!productExists) {
        throw new Error(`the id not exist ${id}`);
    }
}
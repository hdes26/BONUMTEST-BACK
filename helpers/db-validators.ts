import User from '../models/user';


export const emailExists = async (email = '') => {

    // Check if the email exist
    const emailExists = await User.findOne({ email });
    if (emailExists) {
        throw new Error(`The email: ${email} is already registered`);
    }
}

export const UserExistsById = async (id:string) => {

    // Check if the user exist
    const userExists = await User.findById(id);
    if (!userExists) {
        throw new Error(`the id not exist ${id}`);
    }
}
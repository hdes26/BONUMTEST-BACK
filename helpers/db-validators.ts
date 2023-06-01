import User from '../models/user';


export const emailExists = async (correo = '') => {

    // Check if the email exist
    const emailExists = await User.findOne({ correo });
    if (emailExists) {
        throw new Error(`The email: ${correo} is already registered`);
    }
}

export const UserExistsById = async (id:string) => {

    // Check if the user exist
    const userExists = await User.findById(id);
    if (!userExists) {
        throw new Error(`the id not exist ${id}`);
    }
}
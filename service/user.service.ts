import bcryptjs from 'bcryptjs';
import User from '../models/user';

export const listService = async () => {

    const users = await User.find({ active: true });
    return users;

}
export const listByIdService = async (id: string) => {

    const user = await User.findById(id).where({ active: true });
    return user;

}
export const createService = async (userdata: { name: string, email: string, password: string }) => {

    const { name, email, password } = userdata;
    const user = new User({ name, email, password });

    //Encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    //Save in db
    return await user.save();

}

export const updateService = async (id: string, userdata: { name: string }) => {

    const user = await User.findByIdAndUpdate(id, { userdata });
    return user;

}


export const removeService = async (id: string) => {
    const user = await User.findByIdAndRemove(id);
    return user;
}
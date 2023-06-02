import bcryptjs from 'bcryptjs';
import User from '../models/user';
import { v4 as uuidv4 } from 'uuid';


export const listByIdService = async (id: string) => {

    const user = await User.findOne().where({ active: true, id });
    return user;

}
export const createService = async (userdata: { name: string, email: string, password: string }) => {

    const { name, email, password } = userdata;
    const user = new User({ name, email, password, id: uuidv4() });

    //Encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    //Save in db
    return await user.save();

}

export const updateService = async (id: string, userdata: { name: string }) => {

    const user = await User.findOne().where({ id }).updateOne(userdata);
    return user;

}


export const removeService = async (id: string) => {
    const user = await User.findOne().where({ id }).updateOne({ active: false });
    return user;
}
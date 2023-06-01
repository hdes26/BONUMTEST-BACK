import { Schema, model } from 'mongoose';

interface IUser {
    name: string;
    email: string;
    password: string;
    active: boolean;
}

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    active: {
        type: Boolean,
        default: true
    },
});


const User = model<IUser>('User', userSchema);

export default User;

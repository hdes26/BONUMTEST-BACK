import { Schema, model } from 'mongoose';

interface IUser {
    name: string;
    email: string;
    password: string;
    active:boolean;
}

const UserSchema = new Schema<IUser>({
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



UserSchema.methods.toJSON = function () {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model('User', UserSchema);
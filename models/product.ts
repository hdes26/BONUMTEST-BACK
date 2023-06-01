import mongoose, { Schema, model } from 'mongoose';

interface IProduct {
    id: string;
    name: string;
    description: string;
    image: string;
    creator: Schema;
    active: boolean;
}

const productSchema = new Schema<IProduct>({
    id: {
        type: String,
        required: [true, 'Id is required']
    },
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    image: {
        type: String,
        required: [true, 'Image is required']
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Creator is required'],
        ref: 'User'
    },
    active: {
        type: Boolean,
        default: true
    },
});


const Product = model<IProduct>('Product', productSchema);

export default Product;

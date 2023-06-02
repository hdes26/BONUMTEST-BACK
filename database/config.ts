import mongoose from 'mongoose';


export const dbConnection = async () => {

    try {
        await mongoose.connect('mongodb+srv://admin:CaxLmznJtK2ozNeq@cluster0.vf9o8.mongodb.net/?authMechanism=DEFAULT', {});
        console.log('Database online');

    } catch (error) {
        console.log(error);
        throw new Error('Error starting database');
    }


}

import mongoose from 'mongoose';


export const dbConnection = async () => {

    try {

        await mongoose.connect(process.env.MONGOURI!, {});
        console.log('Database online');

    } catch (error) {
        console.log(error);
        throw new Error('Error starting database');
    }


}

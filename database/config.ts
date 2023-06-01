import mongoose from 'mongoose';


export const dbConnection = async () => {

    try {

        await mongoose.connect('mongodb://admin:password@localhost:27017/?authMechanism=DEFAULT', {});
        console.log('Database online');

    } catch (error) {
        console.log(error);
        throw new Error('Error starting database');
    }


}

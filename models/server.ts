import express, { Application } from 'express';
import cors from 'cors';
import { dbConnection } from '../database/config';

export class Server {
    private app: Application;
    private readonly port: string = process.env.PORT || '12001';

    constructor() {
        this.app = express();

        //Connect to dadatabase
        this.dbConnect();

        //Middlewares
        this.middlewares();

        //Routes
        this.routes();
    }

    private async dbConnect(): Promise<void> {
        await dbConnection();
    }

    private middlewares(): void {
        //CORS
        this.app.use(cors());

        //Read the body
        this.app.use(express.json());

        //Public folder
        this.app.use(express.static('public'))

    }

    private routes(): void {

    }

    public listen(): void {
        this.app.listen(this.port, () => {
            console.log("Server running on the port", this.port);
        });
    }
}


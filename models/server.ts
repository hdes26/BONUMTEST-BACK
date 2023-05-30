import express, { Application } from 'express';


export class Server {
    private app: Application;
    private readonly port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '12001';


        //Connect to dadatabase
        this.dbConnect();

        //Middlewares
        this.middlewares();

        //Routes
        this.routes();
    }

    private async dbConnect(): Promise<void> {

    }

    private middlewares(): void {

    }

    private routes(): void {

    }

    public listen(): void {
        this.app.listen(this.port, () => {
            console.log("Server running on the port", this.port);
        });
    }
}


import express, { Application } from 'express';
import cors from 'cors';
import path from "path";
import { router } from '../routes/user.routes';

//swagger
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
const swaggerSpec = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Backend Prueba",
            version: "1.0.0"
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT}`
            },
        ],
    },
    apis: [`${path.join(__dirname, "../routes/*.js")}`],
};

export class Server {
    private app: Application;
    private readonly port: string;
    private readonly paths: { users: string, swagger: string };

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '12001';
        this.paths = {
            users: "/users",
            swagger: "/api-doc"
        };


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
        //CORS
        this.app.use(cors());

        //Read the body
        this.app.use(express.json());

        //Public folder
        this.app.use(express.static('public'))

    }

    private routes(): void {
        this.app.use(this.paths.users, router);
        this.app.use(this.paths.swagger, swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));

    }

    public listen(): void {
        this.app.listen(this.port, () => {
            console.log("Server running on the port", this.port);
        });
    }
}


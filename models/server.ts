import express, { Application } from 'express';
import cors from 'cors';
import path from "path";
import { dbConnection } from '../database/config';
import UserRoute from '../routes/user.routes';
import AuthRoute from '../routes/auth.routes';
import ProductRoute from '../routes/product.routes';

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
                url: `https://test-bonum.herokuapp.com/`
            },
            {
                url: `https://test-bonum.herokuapp.com/`
            },
        ],
    },
    apis: [`${path.join(__dirname, "../routes/*.js")}`],
};


export class Server {
    private app: Application;
    private readonly port: string = process.env.PORT || '12001';
    private readonly paths: { users: string, auth: string, products: string, swagger: string };


    constructor() {
        this.app = express();
        this.paths = {
            auth: "/authorization",
            users: "/users",
            products: "/products",
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
        this.app.use(this.paths.users, UserRoute);
        this.app.use(this.paths.auth, AuthRoute);
        this.app.use(this.paths.products, ProductRoute);
        this.app.use(this.paths.swagger, swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));

    }

    public listen(): void {
        console.log(process.env.PORT);
        this.app.listen(this.port, () => {
            console.log("Server running on the port", this.port);
        });
    }
}


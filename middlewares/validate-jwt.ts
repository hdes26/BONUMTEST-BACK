import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';


export const validateJWT = async (req: Request | any, res: Response, next: NextFunction) => {

    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({
            msg: 'The token is required'
        });
    }

    try {

        interface DecodedToken {
            id: string;
            name: string;
            email: string;
            iat: number,
            exp: number
        }

        let decodedToken: DecodedToken = jwt.verify(token, 'ASDJK13J21I0JIDAS') as DecodedToken;

        const { id, exp } = decodedToken;

        const currentTime = Math.floor(Date.now() / 1000); // We get the current time in seconds
        if (currentTime > exp) throw new Error('token expired');



        const user = await User.findOne().where({ id });

        if (!user) {
            return res.status(401).json({
                msg: 'Invalid token - user not exist in db'
            })
        }
        req.user = user;
        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Invalid token'
        })
    }

}

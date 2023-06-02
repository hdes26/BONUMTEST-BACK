import { Response, Request } from 'express';
import { loginService } from '../service/auth.service';


export const login = async (req: Request, res: Response) => {

    try {
        let login = await loginService(req.body);
        res.json(login);
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: error });
    }
}
import bcryptjs from 'bcryptjs';

import User from '../models/user';

import { generateJWT } from '../helpers/generate-jwt';

export const loginService = async (userdata: { email: string, password: string }) => {

        const { email, password } = userdata;
        // Check if the email exists
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("User / Incorrect password - email")
        }
        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            throw new Error("User / Incorrect password - email")
        }

        // Generar el JWT
        const token = await generateJWT(user.id);

        return { user, token }
    
}

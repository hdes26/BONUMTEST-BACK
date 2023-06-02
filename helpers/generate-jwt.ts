import jwt from 'jsonwebtoken';



export const generateJWT = (id = '') => {

    return new Promise((resolve, reject) => {

        const payload = { id };

        jwt.sign(payload, 'ASDJK13J21I0JIDAS', {
            expiresIn: '4h'
        }, (err, token) => {

            if (err) {
                console.log(err);
                reject('Failed to generate token')
            } else {
                resolve(token);
            }
        })

    })
}
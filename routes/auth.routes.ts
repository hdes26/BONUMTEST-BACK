import { Router } from 'express';
import { check } from 'express-validator';
import { validateFields } from '../middlewares';
import { login } from '../controllers/auth.controller';


const router = Router();


/**
 * @swagger
 * components:
 *  securitySchemes: 
 *      ApiKeyAuth: 
 *          type: apiKey
 *          name: Authorization
 *          in: header
 *  schemas:
 *    Auth:
 *      type: object
 *      properties:
 *          email:
 *              type: string
 *              description: the user email
 *          password:
 *              type: string
 *              description: the user password
 *      required:
 *         - email
 *         - password
 *      example:
 *         email: prueba123@gmail.com 
 *         password: a123456 
 */

//login
/**
 *@swagger
 * /authorization:
 *  post:
 *      summary: login
 *      tags: [Auth]
 *      requestBody:
 *          requerid: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Auth'
 *      responses:
 *          200:
 *              description: successful login!
 */
router.post('/', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
], login);

export default router;
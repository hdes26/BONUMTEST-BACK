import { Router } from 'express';
import { createUser, deleteUser, getUser, getUsers, updateUser } from '../controller/user.controller';
import { check } from 'express-validator';
import { validateFields } from '../middlewares';


export const router = Router();




/**
 * @swagger
 * components:
 *  securitySchemes: 
 *      ApiKeyAuth: 
 *          type: apiKey
 *          name: Authorization
 *          in: header
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *          name:
 *              type: string
 *              description: the user name
 *          correo:
 *              type: string
 *              description: the user correo
 *          password:
 *              type: string
 *              description: the user password
 *      required:
 *         - name
 *         - correo
 *         - password
 *      example:
 *         name: Hernan
 *         correo: prueba123@gmail.com 
 *         password: a123456 
 */

//create user
/**
 *@swagger
 * /users:
 *  post:
 *      summary: create a new user
 *      tags: [User]
 *      requestBody:
 *          requerid: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: new user created!
 */
router.post('/', [
    check('name', 'The name is required').not().isEmpty(),
    check('password', 'The password must be more than 6 letters').isLength({ min: 6 }),
    check('correo', 'The email is not valid').isEmail(),
    validateFields
], createUser);


// update user
/**
 *@swagger
 * /users/{id}:
 *  put:
 *      security:
 *        - ApiKeyAuth: [Authorization]
 *      summary: update user
 *      tags: [User]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: uid 
 *      requestBody:
 *          requerid: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: updated user!

 *          401:
 *              description: invalid token
 */
router.put('/:id', [], updateUser);


//delete user
/**
 *@swagger
 * /users/{id}:
 *  delete:
 *      security:
 *        - ApiKeyAuth: [Authorization]
 *      summary: delete user
 *      tags: [User]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: uid 
 *      responses:
 *          200:
 *              description: deleted user!

 *          401:
 *              description: invalid token
 */
router.delete('/:id', [], deleteUser);


//get user
/**
 *@swagger
 * /users/{id}:
 *  get:
 *      security:
 *        - ApiKeyAuth: [Authorization]
 *      summary: get user
 *      tags: [User]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: uid 
 *      responses:
 *          200:
 *              description: obtained user!

 *          401:
 *              description: invalid token
 */
router.get('/:id', [], getUser);

//get users
/**
 *@swagger
 * /users/:
 *  get:
 *      security:
 *        - ApiKeyAuth: [Authorization]
 *      summary: get users
 *      tags: [User]
 *      responses:
 *          200:
 *              description: obtained users!

 *          401:
 *              description: invalid token
 */
router.get('/', [], getUsers);

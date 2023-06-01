import { Router } from 'express';
import { check } from 'express-validator';
import { validateFields, validateJWT } from '../middlewares';
import { UserExistsById, emailExists } from '../helpers';
import { createUser, deleteUser, getUser, updateUser } from '../controllers/user.controller';


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
 *    User:
 *      type: object
 *      properties:
 *          name:
 *              type: string
 *              description: the user name
 *          email:
 *              type: string
 *              description: the user email
 *          password:
 *              type: string
 *              description: the user password
 *      required:
 *         - name
 *         - email
 *         - password
 *      example:
 *         name: Hernan
 *         email: prueba123@gmail.com 
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
    check('email', 'The email is not valid').isEmail(),
    check('email').custom(emailExists),
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
 *            description: id 
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
router.put('/:id', [
    validateJWT,
    check('id', 'Not a valid id').isMongoId(),
    check('id').custom(UserExistsById),
    validateFields
], updateUser);


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
 *            description: id 
 *      responses:
 *          200:
 *              description: deleted user!

 *          401:
 *              description: invalid token
 */
router.delete('/:id', [
    validateJWT,
    check('id', 'Not a valid id').isMongoId(),
    check('id').custom(UserExistsById),
], deleteUser);


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
 *            description: id 
 *      responses:
 *          200:
 *              description: obtained user!

 *          401:
 *              description: invalid token
 */
router.get('/:id', [
    validateJWT,
    check('id', 'Not a valid id').isMongoId(),
    check('id').custom(UserExistsById),
], getUser);



export default router;
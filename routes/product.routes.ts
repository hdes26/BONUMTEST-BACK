import { Router } from 'express';
import { check } from 'express-validator';
import { validateFields, validateJWT } from '../middlewares';
import { ProductExistsById, UserExistsById } from '../helpers';
import { createProduct, deleteProduct, getProduct, getProductsByUser, updateProduct } from '../controllers/product.controller';


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
 *    Product:
 *      type: object
 *      properties:
 *          name:
 *              type: string
 *              description: the product name
 *          description:
 *              type: string
 *              description: the product description
 *          image:
 *              type: string
 *              description: the product image
 *          creator:
 *              type: string
 *              description: the product creator
 *      required:
 *         - name
 *         - description
 *         - image
 *         - creator
 *      example:
 *         name: Perfume Eros
 *         description: Perfume marca versace
 *         image: https://www.sephora.com/productimages/product/p382751-av-2-zoom.jpg 
 *         creator: 2582e105-f23f-44bb-880d-ef4c14a76bc8 
 */

//create product
/**
 *@swagger
 * /products:
 *  post:
 *      summary: create a new product
 *      tags: [Product]
 *      requestBody:
 *          requerid: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Product'
 *      responses:
 *          200:
 *              description: new product created!
 */
router.post('/', [
    check('name', 'The name is required').not().isEmpty(),
    check('description', 'The description is required').not().isEmpty(),
    check('image', 'The image is required').not().isEmpty(),
    check('creator', 'The creator is required').not().isEmpty().isUUID(),
    validateFields
], createProduct);


// update product
/**
 *@swagger
 * /products/{id}:
 *  put:
 *      security:
 *        - ApiKeyAuth: [Authorization]
 *      summary: update product
 *      tags: [Product]
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
 *                      $ref: '#/components/schemas/Product'
 *      responses:
 *          200:
 *              description: updated product!

 *          401:
 *              description: invalid token
 */
router.put('/:id', [
    validateJWT,
    check('id', 'Not a valid id').isUUID(),
    check('id').custom(ProductExistsById),
    validateFields
], updateProduct);


//delete product
/**
 *@swagger
 * /products/{id}:
 *  delete:
 *      security:
 *        - ApiKeyAuth: [Authorization]
 *      summary: delete product
 *      tags: [Product]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: id 
 *      responses:
 *          200:
 *              description: deleted product!

 *          401:
 *              description: invalid token
 */
router.delete('/:id', [
    validateJWT,
    check('id', 'Not a valid id').isUUID(),
    check('id').custom(ProductExistsById),
], deleteProduct);


//get product
/**
 *@swagger
 * /products/{id}:
 *  get:
 *      security:
 *        - ApiKeyAuth: [Authorization]
 *      summary: get product
 *      tags: [Product]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: id 
 *      responses:
 *          200:
 *              description: obtained product!

 *          401:
 *              description: invalid token
 */
router.get('/:id', [
    validateJWT,
    check('id', 'Not a valid id').isUUID(),
    check('id').custom(ProductExistsById),
], getProduct);

//get products by User
/**
 *@swagger
 * /products/byuser/{userId}:
 *  get:
 *      security:
 *        - ApiKeyAuth: [Authorization]
 *      summary: get products by user
 *      tags: [Product]
 *      parameters:
 *          - in: path
 *            name: userId
 *            schema:
 *              type: string
 *            required: true
 *            description: userId 
 *      responses:
 *          200:
 *              description: obtained products!

 *          401:
 *              description: invalid token
 */
router.get('/byuser/:userId', [
    validateJWT,
    check('userId', 'Not a valid id').isUUID(),
    check('userId').custom(UserExistsById),
], getProductsByUser);


export default router;
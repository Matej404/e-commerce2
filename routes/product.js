const express = require('express');
const router = express.Router();

const ProductService = require('../services/ProductService');
const ProductServiceInstance = new ProductService();

module.exports = (app) => {
    app.use('/products', router);

    /**
     * @openapi
     * /product/:
     *   get:
     *     tags:
     *       - Product
     *     summary: Get a list of all products
     *     description: Returns a list of all products available in the store.
     *     security:
     *       - BearerAuth: []
     *     responses:
     *       200:
     *         description: A list of products
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Product'
     *       400:
     *         description: Bad request
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal server error
     */
    router.get('/', async(req, res, next) => {
        try {
            const response = await ProductServiceInstance.list();
            res.status(200).send(response)
        } catch(err) {
            next(err);
        }

    })

    /**
     * @openapi
     * /product/{productId}:
     *   get:
     *     tags:
     *       - Product
     *     summary: Get a single product
     *     description: Returns a single product available in the store.
     *     security:
     *       - BearerAuth: []
     *     responses:
     *       200:
     *         description: List single product
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Product'
     *       400:
     *         description: Bad request
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal server error
     */
    router.get('/:productId', async(req, res, next) => {
        try {
            const {productId} = req.params;

            const response = await ProductServiceInstance.get(productId);
    
            res.status(200).send(response)
        } catch(err) {
            next(err);
        }
    })

    /**
     * @openapi
     * /product/:
     *   post:
     *     tags:
     *       - Product
     *     summary: Create a new product
     *     description: Create a new product in the store.
     *     security:
     *       - BearerAuth: []
     *     responses:
     *       200:
     *         description: The details of the new product
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Product'
     *       400:
     *         description: Bad request
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal server error
     */
    router.post('/', async(req, res, next) => {
        try {
            const data = req.body;

            const response = await ProductServiceInstance.create(data);

            res.status(200).send(response)
        } catch(err) {
            next(err);
        }
    })

    
    /**
     * @openapi
     * /product/{productId}:
     *   put:
     *     tags:
     *       - Product
     *     summary: Update a product
     *     description: Update a product in the store
     *     security:
     *       - BearerAuth: []
     *     responses:
     *       200:
     *         description: The updated product
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Products'
     *       400:
     *         description: Bad request
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal server error
     */
    router.put('/:productId', async(req, res, next) => {
        try {
            const {productId} = req.params;
            const data = req.body;
            const response = await ProductServiceInstance.update({id: productId, ...data});

            res.status(200).send(response);
        } catch(err) {
            next(err);
        }
    })

    /**
     * @openapi
     * /product/{productId}:
     *   delete:
     *     tags:
     *       - Product
     *     summary: Delete a product
     *     description: Delete a product from the store
     *     security:
     *       - BearerAuth: []
     *     responses:
     *       200:
     *         description: Product deleted successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Product'
     *       400:
     *         description: Bad request
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal server error
     */
    router.delete('/:productId', async(req, res, next) => {
        try {
            const { productId } = req.params;
    
            const response = await ProductServiceInstance.removeProduct(productId);

            res.status(200).send(response);
        } catch(err) {
            next(err);
        }
    })
}
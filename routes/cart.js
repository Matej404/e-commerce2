const { response } = require('express');
const express = require('express');
const router = express.Router();
const CartService = require('../services/CartService');

const CartServiceInstance = new CartService();

module.exports = (app) => {
    app.use('/carts', router);

    /**
     * @openapi
     * /carts/mine:
     *   get:
     *     tags:
     *       - Cart
     *     summary: Retrieve the user's cart
     *     description: Loads the cart for the currently authenticated user
     *     security:
     *       - BearerAuth: []
     *     responses:
     *       200:
     *         description: Successfully retrieved the user's cart
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Cart'
     *       400:
     *         description: Bad request
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal server error
     */

    //IT WORKS, RETURS USER'S CART
    router.get('/mine', async (req, res, next) => {
        try {
            const { id } = req.user;
            const response = await CartServiceInstance.loadCart(id)

            res.status(200).send(response);
        } catch (err) {
            next(err);
        }
    })

    /**
     * @openapi
     * /carts/mine:
     *   post:
     *     tags:
     *       - Cart
     *     summary: Create a new cart for the user
     *     description: Creates a new cart for the currently authenticated user
     *     security:
     *       - BearerAuth: []
     *     responses:
     *       200:
     *         description: Successfully created the user's cart
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Cart'
     *       400:
     *         description: Bad request
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal server error
     */

    //IT WORKS, CREATES NEW CART
    router.post('/mine', async (req, res, next) => {
        try {
            const { id } = req.user;

            const response = await CartServiceInstance.create({ userId: id });

            res.status(200).send(response)
        } catch (err) {
            next(err);
        }
    })

    
    /**
     * @openapi
     * /carts/mine/item:
     *   post:
     *     tags:
     *       - Cart
     *     summary: Add an item to the user's cart
     *     description: Adds an item to the cart of the currently authenticated user
     *     security:
     *       - BearerAuth: []
     *     requestBody:
     *       description: The item to be added to the cart
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Item'
     *     responses:
     *       200:
     *         description: Successfully added the item to the user's cart
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Item'
     *       400:
     *         description: Bad request
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal server error
     */

    router.post('/mine/items', async (req, res, next) => {
        try {
            const { id } = req.user;
            const data = req.body;
            console.log(req.user);
            console.log(req.body)

            const response = await CartServiceInstance.addItem(id, data);

            res.status(200).send(response);
        } catch (err) {
            next(err);
        }
    })


    /**
     * @openapi
     * /carts/mine/item/{cartItemId}:
     *   put:
     *     tags:
     *       - Cart
     *     summary: Updates an item in the user's cart
     *     description: Updates an item in the cart of the currently authenticated user
     *     security:
     *       - BearerAuth: []
     *     requestBody:
     *       description: The item to be updated in the cart
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Item'
     *     responses:
     *       200:
     *         description: Successfully updated the item in the user's cart
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Item'
     *       400:
     *         description: Bad request
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal server error
     */

    //IT WORKS, UPDATES AN ITEM IN THE CART
    router.put('/mine/items/:cartItemId', async (req, res, next) => {
        try {
            const { cartItemId } = req.params;
            const data = req.body

            const response = await CartServiceInstance.updateItem(cartItemId, data);
            res.status(200).send(response)
        } catch (err) {
            next(err);
        }
    })


    /**
     * @openapi
     * /carts/mine/item/{createItemId}:
     *   delete:
     *     tags:
     *       - Cart
     *     summary: Delete an item from the user's cart
     *     description: Deletes an item from the cart of the currently authenticated user
     *     security:
     *       - BearerAuth: []
     *     requestBody:
     *       description: The item to be deleted from the cart
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Item'
     *     responses:
     *       200:
     *         description: Successfully deleted the item from the user's cart
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Item'
     *       400:
     *         description: Bad request
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal server error
     */

    //IT WORKS, DELETES AN ITEM FROM THE CART
    router.delete('/mine/items/:cartItemId', async (req, res, next) => {
        try {
            const { cartItemId } = req.params;

            const response = await CartServiceInstance.removeItem(cartItemId)

            res.status(200).send(response);
        } catch (err) {
            next(err);
        }
    })

    router.post('/mine/checkout', async (req, res, next) => {
        try {
          const { id } = req.user;
    
          const { cartId, paymentInfo } = req.body; 
    
          const response = await CartServiceInstance.checkout(cartId, id, paymentInfo);
    
          res.status(200).send(response);
        } catch(err) {
          next(err);
        }
      });
}
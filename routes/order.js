const express = require('express');
const router = express.Router();
const OrderService = require('../services/OrderService');
const OrderServiceInstance = new OrderService();

module.exports = (app) => {
    app.use('/order', router);

    /**
     * @openapi
     * /order:
     *   get:
     *     tags:
     *       - Order
     *     summary: Retrieve the user's order list
     *     description: Loads the order list for the currently authenticated user
     *     security:
     *       - BearerAuth: []
     *     responses:
     *       200:
     *         description: Successfully retrieved the user's order list
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Order'
     *       400:
     *         description: Bad request
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal server error
     */
    router.get('/', async(req, res, next) => {
        try {
            const { id } = req.user;

            const response = await OrderServiceInstance.list(id);

            res.status(200).send(response);
        } catch(err) {
            next(err);
        }
    })

    /**
     * @openapi
     * order/:orderId:
     *   get:
     *     tags:
     *       - Order
     *     summary: Retrieve the user's ordered item
     *     description: Loads the ordered item for the currently authenticated user
     *     security:
     *       - BearerAuth: []
     *     responses:
     *       200:
     *         description: Successfully retrieved the user's ordered item
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Order' 
     *       400:
     *         description: Bad request
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal server error
     */
    router.get('/:orderId', async(req, res, next) => {
        try {
            const { orderId } = req.params;

            const response = await OrderServiceInstance.findById(orderId);

            res.status(200).send(response);
        } catch(err) {
            next(err);
        }
    })

    /**
     * @openapi
     * /:orderId:
     *   post:
     *     tags:
     *       - Order
     *     summary: Add an item to the user's order list
     *     description: Adds an item to the order list of the currently authenticated user
     *     security:
     *       - BearerAuth: []
     *     requestBody:
     *       description: The item to be added to the order list
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Item'
     *     responses:
     *       200:
     *         description: Successfully added the item to the user's order list
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
    router.post('/', async(req, res, next) => {
        try {
            const {orderId} = req.params;

            const response = await OrderServiceInstance.create(orderId);

            res.status(200).send(response)
        } catch(err) {
            throw err;
        }
    })

    /**
     * @openapi
     * /:orderId:
     *   put:
     *     tags:
     *       - Order
     *     summary: Updates an item in the user's order list
     *     description: Updates an item in the user's order list
     *     security:
     *       - BearerAuth: []
     *     requestBody:
     *       description: The item to be updated in the order list
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Item'
     *     responses:
     *       200:
     *         description: Successfully updated the item in the user's order list
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
    router.put('/:orderId', async(req, res, next) => {
        try {
            const {orderId} = req.params;
            const data = req.body;

            const response = await OrderServiceInstance.update(orderId, data)

            res.status(200).send(response)
        } catch(err) {
            next(err);
        }
    })

    /**
     * @openapi
     * /:orderItemId:
     *   delete:
     *     tags:
     *       - Order
     *     summary: Delete an item from the user's order list
     *     description: Deletes an item from the order list of the currently authenticated user
     *     security:
     *       - BearerAuth: []
     *     requestBody:
     *       description: The item to be deleted from the order list
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Item'
     *     responses:
     *       200:
     *         description: Successfully deleted the item from the user's order list 
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
    router.delete('/:orderItemId', async(req, res, next) => {
        try {
            const {orderItemId} = req.params;

            const response = OrderServiceInstance.removeOrder(orderItemId);

            res.send(200).status(response);
        } catch(err) {
            next(err);
        }
    })
}
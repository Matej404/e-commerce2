const express = require('express');
const router = express.Router();
const OrderService = require('../services/OrderService');
const OrderServiceInstance = new OrderService();

module.exports = (app) => {
    app.use('/orders', router);

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
     * order/{orderId}:
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
}
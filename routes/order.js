const express = require('express');
const router = express.Router();
const OrderService = require('../services/OrderService');
const OrderServiceInstance = new OrderService();

module.exports = (app) => {
    app.use('/order', router);

    router.get('/', async(req, res, next) => {
        try {
            const { id } = req.user;

            const response = await OrderServiceInstance.list(id);

            res.status(200).send(response);
        } catch(err) {
            next(err);
        }
    })

    router.get('/:orderId', async(req, res, next) => {
        try {
            const { orderId } = req.params;

            const response = await OrderServiceInstance.findById(orderId);

            res.status(200).send(response);
        } catch(err) {
            next(err);
        }
    })

    router.post('/', async(req, res, next) => {
        try {
            const {orderId} = req.params;

            const response = await OrderServiceInstance.create(orderId);

            res.status(200).send(response)
        } catch(err) {
            throw err;
        }
    })

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
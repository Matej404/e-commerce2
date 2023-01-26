const { response } = require('express');
const express = require('express');
const router = express.Router();
const CartService = require('../services/CartService');

const CartServiceInstance = new CartService();

module.exports = (app) => {
    app.use('carts', router);

    router.get('/mine', async(req, res, next) => {
        try {
            const {id} = req.user;
            const response = await CartServiceInstance.loadCart(id)

            res.status(200).send(response);
        } catch (err) {
            next(err);
        }
    })

    router.post('/mine', async(req, res, next) => {
        try {
            const {userId} = req.user;

            const response = await CartServiceInstance.create({ id: userId });

            res.status(200).send(response)
        } catch(err) {
            next(err);
        }
    })

    router.post('/mine/item', async(req, res, next) => {
        try {
            const {id} = req.user;
            const data = req.body;

            const response = await CartServiceInstance.addItem(id, data);

            res.status(200).send(response);
        } catch(err) {
            next(err);
        }
    })

    router.put('/mine/item/createItemId', async(req, res, next) => {
        try {
            const {createItemId} = req.params;
            const data = req.body;

            const response = await CartServiceInstance.updateItem(createItemId, data);
            res.status(200).send(response)
        } catch(err) {
            next(err);
        }
    })

    router.delete('/mine/item/createItemId', async(req, res, next) => {
        try {
            const {createItemId} = req.params;

            const response = new CartServiceInstance.removeItem(createItemId)

            res.status(200).send(response);
        } catch(err) {
            next(err);
        }
    })
}
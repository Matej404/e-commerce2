const express = require('express');
const router = express.Router();

const UserService = require('../services/UserService');
const UserServiceInstance = new UserService;

module.exports = (app) => {
    app.use('/users', router);

    router.get('/', async(req, res, next) => {
        try {
            const queryParams = req.query;
            const response = await UserServiceInstance.list(queryParams);

            res.status(200).send(response)
        } catch(arr) {
            next(arr);
        }
    })

    router.get('/:userId', async(req, res, next) => {
        try {
            const {userId} = req.params;
            const response = await UserServiceInstance.get({id: userId});
            
            res.status(200).send(response);
        } catch(err) {
            next(err);
        }
    })

    router.post('/', async(req, res, next) => {
        try {
            const {userId} = req.user;

            const response = await UserServiceInstance.create(userId);

            res.status(200).send(response)
        } catch(err) {
            next(err);
        }
    })

    router.put('/:userId', async(req, res, next) => {
        try {
            const {userId} = req.params;
            const data = req.body;
            const response = await UserServiceInstance.update({id: userId, ...data});

            res.status(200).send(response);
        }catch(err) {
            next(err);
        }
    })

    router.delete('/:userId', async(req, res, next) => {
        try {
            const {userId} = req.params;
            const response = await UserServiceInstance.removeUser(userId);

            res.status(200).send(response);
        } catch(err) {
            next(err);
        }
    })
}
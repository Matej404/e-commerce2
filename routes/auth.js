const express = require('express');
const router = express.Router();
const AuthService = require('../services/AuthService');
const AuthServiceInstance = new AuthService();

module.exports = (app) => {

  app.use('/users', router);

  router.post('/register', async (req, res, next) => {
    try {
      const data = req.body;


      const response = await AuthServiceInstance.create(data);
      res.status(201).send(response);
    } catch(err) {
      next(err);
    }
  });
}
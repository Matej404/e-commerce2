const express = require('express');
const passport = require('../loaders/passport');
const router = express.Router();
const AuthService = require('../services/AuthService');
const AuthServiceInstance = new AuthService();

module.exports = (app) => {

  app.use('/users', router);

  router.post('/register', async (req, res, next) => {
    try {
      const data = req.body;


      const response = await AuthServiceInstance.register(data);
      res.status(201).send(response);
    } catch(err) {
      next(err);
    }
  });

  router.post('/login', passport.authenticate('local'), async(res, req, next) => {
    try {
      const {username, password} = req.body;

      const response = await AuthServiceInstance.login({ email: username, password });

      res.status(200).send(response);
    } catch(err) {
      next(err);
    }
  })
}
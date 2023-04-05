const express = require('express');
const router = express.Router();
const AuthService = require('../services/AuthService');
const AuthServiceInstance = new AuthService();

module.exports = (app, passport) => {

  app.use('/auth', router);

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Registers a new user with the provided information
 *     requestBody:
 *       description: The user information to be registered
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Auth'
 *     responses:
 *       201:
 *         description: Registration successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid request body
 *       409:
 *         description: User already exists
 */
  router.post('/register', async (req, res, next) => {
    try {
      const data = req.body;


      const response = await AuthServiceInstance.register(data);
      res.status(201).send(response);
    } catch(err) {
      next(err);
    }
  });

  /**
 * Logs in a user with the given credentials.
 *
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Logs in a user.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       description: User credentials.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Auth'
 *     responses:
 *       '200':
 *         description: OK.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '401':
 *         description: Unauthorized.
 */
  router.post('/login', passport.authenticate('local'), async (req, res, next) => {
    try {
      const { username, password } = req.body;
    
      const response = await AuthServiceInstance.login({ email: username, password});
    
      res.status(200).send(response);
    } catch(err) {
      next(err);
    }
  });
}




const express = require('express');
const router = express.Router();
const AuthService = require('../services/AuthService');
const AuthServiceInstance = new AuthService();

module.exports = (app, passport) => {

  app.use('/auth', router);

/**
 * Register a new user account
 *
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user account
 *     description: Creates a new user account using the provided user data.
 *     tags:
 *       - Registration
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User object containing registration details
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/User'
 *     responses:
 *       '201':
 *         description: User account created successfully
 *         schema:
 *           $ref: '#/components/schemas/User'
 *       '400':
 *         description: Bad request, missing or invalid parameters
 *       '500':
 *         description: Internal server error
 * definitions:
 *   User:
 *     type: object
 *     required:
 *       - email
 *       - username
 *       - password
 *     properties:
 *       email:
 *         type: string
 *         format: email
 *         description: Email address of the user
 *       username:
 *         type: string
 *         description: Username of the user
 *       password:
 *         type: string
 *         format: password
 *         description: Password of the user
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
 * Login a user
 *
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     description: Authenticates a user using their username (or email) and password.
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: body
 *         name: credentials
 *         description: User credentials (username or email and password)
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/Auth'
 *     responses:
 *       '200':
 *         description: User authenticated successfully
 *         schema:
 *           $ref: '#/components/schemas/User'
 *       '401':
 *         description: Unauthorized, invalid credentials
 *       '500':
 *         description: Internal server error
 * definitions:
 *   Credentials:
 *     type: object
 *     required:
 *       - email
 *       - password
 *     properties:
 *       email:
 *         type: string
 *         description: Username or email of the user
 *       password:
 *         type: string
 *         format: password
 *         description: Password of the user
 *   User:
 *     type: object
 *     required:
 *       - id
 *       - email
 *     properties:
 *       id:
 *         type: string
 *         description: User ID
 *       email:
 *         type: string
 *         format: email
 *         description: Email address of the user
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




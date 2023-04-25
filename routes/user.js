const express = require('express');
const router = express.Router();

const UserService = require('../services/UserService');
const UserServiceInstance = new UserService;

module.exports = (app) => {
    app.use('/users', router);

    /**
     * @openapi
     * /users/:
     *   get:
     *     tags:
     *       - User
     *     summary: Retrieves a list of users
     *     description: Returns a list of users that match the specified page number and page size parameters
     *     security:
     *       - BearerAuth: []
     *     responses:
     *       200:
     *         description: Successfully retrieved a list of users
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       400:
     *         description: Bad request
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal server error
     */
    router.get('/', async(req, res, next) => {
        try {
     
            const response = await UserServiceInstance.list();

            res.status(200).send(response)
        } catch(arr) {
            next(arr);
        }
    })

    /**
     * @openapi
     * /users/{orderId}:
     *   get:
     *     tags:
     *       - User
     *     summary: Retrieve the user from the list
     *     description: Loads the user from the list
     *     security:
     *       - BearerAuth: []
     *     responses:
     *       200:
     *         description: Successfully retrieved the user from
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User' 
     *       400:
     *         description: Bad request
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal server error
     */
    router.get('/:userId', async(req, res, next) => {
        try {
            const {userId} = req.params;
            const response = await UserServiceInstance.get({id: userId});
            
            res.status(200).send(response);
        } catch(err) {
            next(err);
        }
    })

    /**
     * @openapi
     * /users/{userId}:
     *   put:
     *     tags:
     *       - User
     *     summary: Update the user in the list
     *     description: Update currently authenticated user in the list
     *     security:
     *       - BearerAuth: []
     *     responses:
     *       200:
     *         description: Successfully updated user in the list
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User' 
     *       400:
     *         description: Bad request
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal server error
     */

    //NOT WORKING: "Error: error: invalid input syntax for type json". It has to be fixed
    router.put('/:userId', async(req, res, next) => {
        try {
            const {userId} = req.params;
            const data = req.body;
            console.log(data);
            const response = await UserServiceInstance.update({id: userId, ...data});

            res.status(200).send(response);
        }catch(err) {
            next(err);
        }
    })

        /**
     * @openapi
     * /users/{userId}:
     *   delete:
     *     tags:
     *       - User
     *     summary: Delete an user from the list
     *     description: Deletes currently authenticated user from the list 
     *     security:
     *       - BearerAuth: []
     *     requestBody:
     *       description: The user to be deleted from the list
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/User'
     *     responses:
     *       200:
     *         description: Successfully deleted user from the list 
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       400:
     *         description: Bad request
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal server error
     */
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
const express = require('express');
const router = express.Router();

module.exports = (app) => {

    app.use('/orders', router);

    /**
   * @swagger
   * /orders:
   *   get:
   *     description: Returns a list of users
   *     responses:
   *       200:
   *         description: An array of users
   */
    router.get('/', (req, res) => {
        // Get users from the database
        res.status(200).send('response');
    });
}
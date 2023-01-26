const pgp = require('pg-promise');
const client = require('../databasepg');

module.exports = class OrderModel {
    async findByUser(userId) {
        try {
            const statement = `SELECT *
                               FROM order
                               WHERE "userId" = $1`;

            const value = [userId];

            const result = client.query(statement, value);

            if(result.rows?.length) {
                return result.rows[0];
            }

            return null;

        } catch(err) {
            throw new Error(err);
        }
    }

    async findById(orderId) {
        try {
            const statement = `SELECT * 
                               FROM order
                               WHERE id = $1`;

            const values = [orderId];

            const result = await client.query(statement, values);

            if(result.rows?.length) {
                return result.rows[0];
            }

            return null;

        } catch(err) {
            throw new Error(err);
        }
    }   
}
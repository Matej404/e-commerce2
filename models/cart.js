const client = require('../db');
const pgp = require('pg-promise')({ capSQL: true });

module.exports = class CartModel {
    async findOneByUser(userId) {
        try {
            const statement = `SELECT *
                               FROM carts
                               WHERE "userId" = $1`;

            const values = [userId];

            const result = await client.query(statement, values);

            if(result.rows?.length) {
                return result.rows[0];
            }
            return null;
        } catch(err) {
            throw new Error(err);
        }
    }

    async create(userId) {
        try {
            const data = {
                userId,
                modified: new Date(),
                created: new Date()
            }

            const statement = pgp.helpers.insert(data, null, 'carts') + 'RETURNING *';
            console.log(statement)

            const result = await client.query(statement);

            if(result.rows?.length) {
                return result.rows[0];
            }

            return null;
        } catch(err) {
            throw new Error(err);
        }
    }
}
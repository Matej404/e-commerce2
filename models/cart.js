const client = require('../db');
const pgp = require('pg-promise');

module.exports = class CartModel {
    async findOneByUser(userId) {
        try {
            const statement = `SELECT *
                               FROM carts
                               WHERE 'userId = $1`;

            const values = [userId];

            const result = client.query(statement, values);

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
            const data = {userId};

            const statement = pgp.helpers.insert(data, null, 'carts') + 'RETURNING *';

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
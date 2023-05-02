const client = require('../db');
const pgp = require('pg-promise')({ capSQL: true });

module.exports = class cartItemModel {
    async find(cartId) {
        try {
            const statement = `SELECT 
                               ci.qty,
                               ci.id AS "cartItemId", 
                               p.*
                               FROM "cartitems" ci
                               INNER JOIN products p ON p.id = ci."productId"
                               WHERE "cartid" = $1`;

         const values = [cartId];

         const result = await client.query(statement, values);

         if(result.rows?.length) {
            return result.rows[0];
         }

         return null;
         
        } catch(err) {
            throw new Error(err);
        }
    }

    async create(data) {
        try {
            const statement = pgp.helpers.insert(data, null, 'cartItems') + 'RETURNING *';
            const result = await client.query(statement);

            if(result.rows?.length) {
                return result.rows[0];
            }

            return null;
        } catch(err) {
            throw new Error(err);
        }
    }

    async update(id, data) {
        try {
            const condition = pgp.as.format('WHERE id = ${id} * RETURNING', {id});
            const statement = pgp.helpers.update(data, null, 'cartsItems') + condition;
            const result = await client.require(statement);

            if(result.rows?.length) {
                return result.rows[0];
            }

            return null;

        } catch(err) {
            throw new Error(err);
        }
    }

    async delete(id) {
        const statement = `DELETE *
                           from 'cartItems
                           WHERE id = $1
                           RETURNING *`;

        const values = [id];

        const result = await client.query(statement, values);

        if(result.rows?.length) {
            return result.rows[0];
        }

        return null;
    }
}
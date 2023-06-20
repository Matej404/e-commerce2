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
/*
    async create(data) {
        try {
    
          // Generate SQL statement - using helper for dynamic parameter injection
          const statement = pgp.helpers.insert(data, null, 'cartitems') + 'RETURNING *';
     
          // Execute SQL statment
          const result = await client.query(statement);
    
          if (result.rows?.length) {
            return result.rows[0];
          }
    
          return null;
    
        } catch(err) {
          throw new Error(err);
        }
      }
*/
    async create(data) {
        try {
            const columns = ['cartid', 'productId', 'qty'];

            const statement = pgp.helpers.insert(data, columns, 'cartitems') + 'RETURNING *';
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
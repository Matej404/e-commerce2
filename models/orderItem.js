const pgp = require('pg-promise');
const client = require('../db');


module.exports = class OrderItemModel {
    async create(data) {
        try {
          const statement = pgp.helpers.insert(data, null, 'orderItems') + 'RETURNING *';
     
          const result = await client.query(statement);
    
          if (result.rows?.length) {
            return result.rows[0];
          }
    
          return null;
    
        } catch(err) {
          throw new Error(err);
        }
      }

      async find(orderId) {
        try {
          const statement = `SELECT 
                                oi.qty,
                                oi.id AS "cartItemId", 
                                p.*
                             FROM "orderItems" oi
                             INNER JOIN products p ON p.id = oi."productId"
                             WHERE "orderId" = $1`
          const values = [orderId];
      
          const result = await client.query(statement, values);
    
          if (result.rows?.length) {
            return result.rows;
          }
    
          return [];
    
        } catch(err) {
          throw new Error(err);
        }
      }
}
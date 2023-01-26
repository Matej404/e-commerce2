const client = require('../databasepg');
const pgp = require('pg-promise');

module.exports = class ProductModel {
    
    async find(options = {}) {
        try {
            const statement = `SELECT *
                               FROM product`;
    
            const values = [];
    
            const result = await client.query(statement, values);
    
            if(result.rows?.length) {
                return result.rows;
            }
            return [];
        } catch(err) {
            throw(err)
        }
    }


    async findOne(id) {
        try {
            const statement = `SELECT *
                                FROM product
                                WHERE id = $1`;

            const values = [id];

            const result = await client.query(statement, values);

            if(result.rows?.length) {
            return result.rows[0];
            }

            return null;  

            } catch(err) {
                throw(err);
            }
    }

    async create(data) {
        try {
            const {productId} = data; 

            const statement = pgp.helpers.insert(productId, null, 'product') + 'RETURNING *';
            const result = await client.query(statement);

            if(result.rows?.length) {
                return result.rows[0];
            }
            return null;
        } catch(err) {
            throw new Error(err);
        }
    }


    async update(data) {
        try {
            const {id, ...params} = data;

            const condition = pgp.as.format('WHERE id = ${id} RETURNING *', {id});
            const statement = pgp.helpers.update(params, null, 'product') + condition;
            const result = await client.query(statement);

            if(result.rows?.length) {
                return result.rows[0];
            }
            return null;
        } catch(err) {
            throw new Error(err);
        }
    }

    async delete(id) {
        try {
          const statement = `DELETE
                             FROM "product"
                             WHERE id = $1
                             RETURNING *`;
          const values = [id];
      
          const result = await db.query(statement, values);
    
          if (result.rows?.length) {
            return result.rows[0];
          }
    
          return null;
    
        } catch(err) {
          throw new Error(err);
        }
      }
}
const client = require('../db');
const pgp = require('pg-promise')({ capSQL: true });

module.exports = class ProductModel {
    
    async find() {
        try {
            const statement = `SELECT *
                               FROM products`;
    
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
                                FROM products
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
    //OVAJ OBJEKT
    async create(data) {
        try {
            const statement = pgp.helpers.insert(data, null, 'products') + 'RETURNING *';
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
            const statement = pgp.helpers.update(params, null, 'products') + condition;
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
                             FROM "products"
                             WHERE id = $1
                             RETURNING *`;
          const values = [id];
      
          const result = await client.query(statement, values);
    
          if (result.rows?.length) {
            return result.rows[0];
          }
    
          return null;
    
        } catch(err) {
          throw new Error(err);
        }
      }
}
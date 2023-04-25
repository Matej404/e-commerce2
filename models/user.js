const { json } = require('body-parser');
const client = require('../db');
const pgp = require('pg-promise')({ capSQL: true });

module.exports = class UserModel {
    async find() {
        try {
            const statement = `SELECT *
                               FROM users`;
    
            const values = [];
            console.log(statement)
    
            const result = await client.query(statement, values);
    
            if(result.rows?.length) {
                return result.rows;
            }
            return [];
        } catch(err) {
            throw(err)
        }
    }

    async findOneById(id) {
        try {
            const statement = `SELECT * 
                               FROM users 
                               WHERE id = $1`;

            const values = [id];

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
            const columns = ['email', 'password', 'firstname'];

            const statement = pgp.helpers.insert(data, columns, 'users') + 'RETURNING *';
            console.log(statement);
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
            const statement = pgp.helpers.update(params, null, 'users') + condition;
            console.log(statement);
            const result = await client.query(statement);

            if(result.rows?.length) {
                return result.rows[0];
            }
            return null;
        } catch(err) {
            throw new Error(err);
        }
    }

    async findOneByEmail(email) {
        try {
            const statement = `SELECT *
                               FROM users
                               WHERE email = $1`

            const values = [email];

            const result = await client.query(statement, values);

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
                             FROM "users"
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
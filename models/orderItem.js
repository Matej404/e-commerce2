const pgp = require('pg-promise');
const client = require('../databasepg');


module.exports = class OrderItemModel {
    async create(data) {
        try {
            const data = {userId};

            const statement = pgp.helpers.insert(userId, null, 'orders') + 'RETURNING *';
            
            const result = await client.query(statement);

            if(result.rows?.length) {
                return result.rows[0];
            }
            return null;

        } catch(err) {
            return 
        }
    }

    async update(id, data) {
        try {
            const condition = pgp.as.format('WHERE id = $id RETURNING *', {id});
            const statement = pgp.helpers.update(data, null, 'orders') + condition;

            const result = await client.query(statement);

            if(result.rows?.length) {
                return result.rows[0];
            }
            return result.rows[0];

        } catch(err) {
            throw new Error(err);
        }
    }
    async delete(id) {
        try {
            const statement = `SELECT *
                               FROM "orderItems"
                               WHERE id = $id
                               RETURNING *`;

             const values = [id];

             const result = client.query(statement, values);

             if(result.rows?.length) {
                return result.rows[0];
             }

             return null;
             
        } catch(err) {
            throw new Error(err);
        }
    }
}
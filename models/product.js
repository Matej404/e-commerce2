const client = require('../databasepg');

module.exports = class ProductModule {
    
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
                                WHERE product_id = $1`;

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
}
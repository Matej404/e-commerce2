const pgp = require('pg-promise');
const client = require('../db');
const OrderItem = ('./orderItem'); 

module.exports = class OrderModel {
    
    constructor(data = {}) {
        this.items = data.items || [];
        this.total = data.total || 0;
        this.userId = data.userId || null;
    }


    addItems(items) {
        this.items = items.map(item => new OrderItem(item));
    }

    async create() {
        try {
    
          const { items, ...order } = this;
    
          const statement = pgp.helpers.insert(order, null, 'orders') + ' RETURNING *';
    
          const result = await client.query(statement);
    
          if (result.rows?.length) {
    
            Object.assign(this, result.rows[0]);
    
            return result.rows[0];
          }
    
          return null;
    
        } catch(err) {
          throw new Error(err);
        }
      }

      async update(data) {
        try {
          const condition = pgp.as.format('WHERE id = ${id} RETURNING *', { id: this.id });
          const statement = pgp.helpers.update(data, null, 'orders') + condition;
      
          const result = await client.query(statement);
    
          if (result.rows?.length) {
            return result.rows[0];
          }
    
          return null;
    
        } catch(err) {
          throw new Error(err);
        }
      }

    async findByUser(userId) {
        try {
            const statement = `SELECT *
                               FROM order
                               WHERE "userId" = $1`;

            const value = [userId];

            const result = client.query(statement, value);

            if(result.rows?.length) {
                return result.rows[0];
            }

            return null;

        } catch(err) {
            throw new Error(err);
        }
    }

    async findById(orderId) {
        try {
            const statement = `SELECT * 
                               FROM order
                               WHERE id = $1`;

            const values = [orderId];

            const result = await client.query(statement, values);

            if(result.rows?.length) {
                return result.rows[0];
            }

            return null;

        } catch(err) {
            throw new Error(err);
        }
    }   
}
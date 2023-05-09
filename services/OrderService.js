const creaateEror = require('http-errors');
const OrderModel = require('../models/order');
const OrderItemModel = require('../models/orderItem');

const OrderModelInstance = new OrderModel();
const OrderItemModelInstance = new OrderItemModel();

module.exports = class OrderService {
    async list(userId) {
        try {
            const orders = await OrderModelInstance.findByUser(userId);

            return orders;
        } catch(err) {
            throw err;
        }
    }

    async findById(orderId) {
        try {
            const order = await OrderModelInstance.findById(orderId);

            return order;
        } catch(err) {
            throw err;
        }
    }

    async create(data) {

        const {userId} = data;

        try {
            

            const order = await OrderModelInstance.create({ userId });

            return order;

        } catch(err) {
            throw err;
        }
    }

    async update(oredrId, data) {
        try {
            const orderItem = await OrderModelInstance.update(oredrId, data);

            return orderItem;

        } catch(err) {
            throw err;
        }
    }

    async removeOrder(orderItemId) {
        try {
            const orderItem = await OrderItemModelInstance.delete(orderItemId);

            return orderItem;

        } catch(err) {
            throw new Error(err);
        }
    }
}
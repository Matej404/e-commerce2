const createError = require('http-errors');
const CartModel = require('../models/cart');
const CartItemModel = require('../models/cartItem');

const CartModelInstance = new CartModel();
const CartItemModelInstance = new CartItemModel();

module.exports = class CartService {
    async loadCart(userId) {
        try {
            const cart = await CartModel.findOneByUser(userId);
            const items = await CartItemModel.find(cart.id);

            cart.items = items;
            return cart;

        } catch(err) {
            throw err;
        }
    }

    async create(data) {
        try {
            const {userId} = data;

            const cart = await new CartItemModelInstance.create(userId);

            return cart;
        } catch(err) {
            throw new Error(err);
        }
    }

    async addItem(userId, item) {
        try {
            const cart = CartModelInstance.findOneByUser(userId);
            const cartItem = await CartItemModelInstance.create({cartId: cart.id, ...item});

            return cartItem;
        } catch(err) {
            throw err;
        }
    }

    async updateItem(createItemId, data) {
        try {
            const cartItem = await CartItemModelInstance.update(createItemId, data);

            return cartItem;

        } catch(err) {
            throw err;
        }
    }

    async removeItem(createItemId, data) {
        try {
            const cartItem = await CartItemModelInstance.delete(createItemId, data);
            return cartItem;
        } catch(err) {
            throw err;
        }
    }
}
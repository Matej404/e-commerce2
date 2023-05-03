const createError = require('http-errors');
const CartModel = require('../models/cart');
const CartItemModel = require('../models/cartItem');

const CartModelInstance = new CartModel();
const CartItemModelInstance = new CartItemModel();

module.exports = class CartService {
    async loadCart(userId) {
        try {
            const cart = await CartModelInstance.findOneByUser(userId);
            const items = await CartItemModelInstance.find(cart.id);

            cart.items = items;
            return cart;

        } catch(err) {
            throw err;
        }
    }

    async create(data) {
        const {userId} = data;

        try {

            const cart = await CartModelInstance.create(userId);

            return cart;
        } catch(err) {
            throw new Error(err);
        }
    }

    async addItem(userId, item) {
        try {
            const cart = await CartModelInstance.findOneByUser(userId);
            const cartItem = await CartItemModelInstance.create({userId: cart.id, ...item});

            return cartItem;
        } catch(err) {
            throw err;
        }
    }

    async updateItem(cartItemId, data) {
        try {
            const cartItem = await CartItemModelInstance.update(cartItemId, data);

            return cartItem;

        } catch(err) {
            throw err;
        }
    }

    async removeItem(cartItemId) {
        try {
            const cartItem = await CartItemModelInstance.delete(cartItemId);
            return cartItem;
        } catch(err) {
            throw err;
        }
    }

    async checkout(cartId, userId, paymentInfo) {
        try {
    
          const stripe = require('stripe-checkout')('your_stripe_api_key_here');
    
          const cartItems = await CartItemModel.find(cartId);
    
          const total = cartItems.reduce((total, item) => {
            return total += Number(item.price);
          }, 0);
    
          const Order = new OrderModel({ total, userId });
          Order.addItems(cartItems);
          await Order.create();
    
          const charge = await stripe.charges.create({
            amount: total,
            currency: 'usd',
            source: paymentInfo.id,
            description: 'Codecademy Charge'
          });
    
          const order = Order.update({ status: 'COMPLETE' });
    
          return order;
    
        } catch(err) {
          throw err;
        }
      }
}
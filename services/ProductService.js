const createError = require('http-errors');
const ProductModule = require('../models/product');
const ProductModuleInstance = new ProductModule();

module.exports = class ProductService {
    async list(options) {
        try {
            const products = await ProductModuleInstance.find(options);

            return products;

        } catch(err) {
            throw err;
        }

    }

    async get(id) {
        try {
            const product = await ProductModuleInstance.findOne(id);

            if(!product) {
                return createError(404, 'Product not found');
            }
    
            return product;

        } catch(err) {
            throw(err);
        }
    }

    async create(data) {
        const { productId } = data;

        try {
            const product = await ProductModuleInstance.create(productId);

            return product;
        } catch(err) {
            throw(err);
        }
    }

    async update(data) {
        try {
            const product = await ProductModuleInstance.update(data);
            
            return product;
        } catch(err) {
            next(err);
        }
    }

    async removeProduct(productId) {
        try {
          const cartItem = await ProductModuleInstance.delete(productId);
    
          return cartItem;
    
        } catch(err) {
          throw err;
        }
      }
 }
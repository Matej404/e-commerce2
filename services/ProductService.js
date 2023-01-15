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
}
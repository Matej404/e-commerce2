const createError = require('http-errors');
const ProductModel = require('../models/product');
const ProductModelInstance = new ProductModel();

module.exports = class ProductService {
    async list(options) {
        try {
            const products = await ProductModelInstance.find(options);

            return products;

        } catch(err) {
            throw err;
        }

    }

    async get(id) {
        try {
            const product = await ProductModelInstance.findOne(id);

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
            const product = await ProductModelInstance.create(productId);

            return product;
        } catch(err) {
            throw(err);
        }
    }

    async update(data) {
        try {
            const product = await ProductModelInstance.update(data);
            
            return product;
        } catch(err) {
            next(err);
        }
    }

    async removeProduct(productId) {
        try {
          const product = await ProductModelInstance.delete(productId);
    
          return product;
    
        } catch(err) {
          throw err;
        }
      }
 }
const createError = require('http-errors');
const UserModel = require('../models/user');
const UserModelInstance = new UserModel;

module.exports = class UserService {
    async list(options) {
        try {
            const products = await UserModelInstance.find(options);

            return products;

        } catch(err) {
            throw err;
        }

    }

    async get(data) {
        const {id} = data;

        try {
            const user = await UserModelInstance.findOneById(id);
            if(!user) {
                return createError(404, 'User not found');
            }
            return user;
        } catch(err) {
            throw err;
        }
    }

    async create(data) {
        const {userId} = data;

        try {
            const user = await UserModelInstance.create(userId);

            return userId;
            
        } catch(err) {
            throw err;
        }
    }

    async update(data) {
        try {
            const user = await UserModelInstance.update(data);

            return user;
        } catch(err) {
            throw err;
        }
    }

    async removeUser(userId) {
        try {
            const user = await UserModelInstance.delete(userId);

            return user;
        } catch(err) {
            throw err;
        }
    }
}
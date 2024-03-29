const createError = require('http-errors');
const UserModel = require('../models/user');
const UserModelInstance = new UserModel();

module.exports = class AuthService {
    async register(data) {
      console.log(data);
        const { email } = data;
    
        try {
          const user = await UserModelInstance.findOneByEmail(email);
    
          if (user) {
            throw createError(409, 'Email already in use');
          }
    
          return await UserModelInstance.create(data);
    
        } catch(err) {
          throw createError(500, err);
        }
    
      };


      async login(data) {

        const { email, password } = data;
    
        try {
          const user = await UserModelInstance.findOneByEmail(email);
    
          if (!user) {
            throw createError(401, 'Incorrect username or password');
          }
    
          if (user.password !== password) {
            throw createError(401, 'Incorrect username or password');
          }
    
          return user;
    
        } catch(err) {
          throw createError(500, err);
        }
    
      };

      async googleLogin(profile) {
        const { id, displayName } = profile;

        try {
          const user = await UserModelInstance.findOneByGoogleId(id);

          if(!user) {
            return await UserModelInstance.create({ googl: { id, displayName } });
          }

          return user

        } catch(err) {
          throw createError(500, err);
        }
      }

      async facebookLogin(profile) {
        const { id, displayName } = profile;
        try {
          const user = await UserModelInstance.findOneByFacebookId(id);

          if(!user) {
            return await UserModelInstance.create({facebook: id, displayName});
          }

          return user;

        } catch(err) {
          throw createError(500, err);
        }
      }
}
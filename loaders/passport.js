const passport = require('passport');
const LocalStrategy = require('passport-local');
const GoogleStrategy = require('passport-google-oidc').Strategy;
const AuthService = require('../services/AuthService');
const AuthServiceInstance = new AuthService();
const { GOOGLE } = require('../config');

module.exports = (app) => {

  app.use(passport.initialize());  
  app.use(passport.session());
  
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    done(null, { id });
  });

  passport.use(new LocalStrategy(
    async (username, password, done) => {
      try {
        const user = await AuthServiceInstance.login({ email: username, password });
        return done(null, user);
      } catch(err) {
        return done(err);
      }
    }
  ));

  passport.use(new GoogleStrategy({
    clientID: GOOGLE.CONSUMER_KEY,
    clientSecret: GOOGLE.CONSUMER_SECRET,
    callbackURL: GOOGLE.CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await AuthServiceInstance.googleLogin(profile);
      return done(null, user);
    } catch(err) {
      return done(err);
    }
  }
));

  return passport;

}

module.exports = {
  PORT: process.env.PORT,
  DB: {
    PGHOST: process.env.PGHOST,
    PGUSER: process.env.PGUSER,
    PGDATABASE: process.env.PGDATABASE,
    PGPASSWORD: process.env.PGPASSWORD,
    PGPORT: process.env.PGPORT
  },
  GOOGLE: {
    CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
    CONSUMER_KEY: process.env.GOOGLE_CONSUMER_KEY,
    CONSUMER_SECRET: process.env.STRIPE_SECRET_KEY
  },
  FACEBOOK: {
    CALLBACK_URL: process.env.FACEBOOK_CALLBACK_URL,
    CONSUMER_KEY: process.env.FACEBOOK_CONSUMER_KEY,
    CONSUMER_SECRET: process.env.FACEBOOK_CONSUMER_SECRET
  },
  SESSION_SECRET: process.env.SESSION_SECRET
}
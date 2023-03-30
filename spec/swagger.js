const swaggerJsdoc = require('swagger-jsdoc');

// Import custom component schema definitions
// This is used to have a single place to maintain schemas which will be reused
const schemas = require('./schemas')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-Commerce Open Api v3.0.0 Specification',
      version: '1.0.0',
    },
    components: {
      schemas: schemas
    }
  },
  apis: ['./routes/*.js'],   
};

const openapiSpecification = swaggerJsdoc(options);

module.exports = openapiSpecification
// Configure swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../spec/swagger');


module.exports = async(app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
// Configure swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../spec/swagger');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
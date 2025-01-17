const swaggerJsDoc = require('swagger-jsdoc');
const { app: { port } } = require("../config/server.config");

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Server Example',
            version: '1.0.0',
            description: 'A simple Express API with Swagger documentation',
        },
        servers: [
            {
                url: `http://localhost:${port}`,
                description: 'Local server',
            },
        ],
    },
    apis: ['../routes/*.js'], // Đường dẫn tới các file chứa comment Swagger
};

const swaggerSpec = swaggerJsDoc(options);
module.exports = swaggerSpec;

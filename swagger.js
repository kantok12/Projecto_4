const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gestión de Reservas de Hotel',
      version: '1.0.0',
      description: 'API REST para gestionar reservas de hotel',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desarrollo',
      },
    ],
  },
  apis: ['./routes/*.js'], // archivos que contienen anotaciones
};

const specs = swaggerJsdoc(options);
module.exports = specs; 
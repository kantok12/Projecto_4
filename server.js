require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const reservasRoutes = require('./routes/reservas');

const app = express();
const port = process.env.PORT || 3000;

// Configuración de seguridad
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // límite de 100 peticiones por ventana
});

// Middleware de seguridad
app.use(helmet());
app.use(limiter);
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(morgan('dev'));
app.use(express.json({ limit: '10kb' }));

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Rutas
app.use('/api/reservas', reservasRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  // No exponer detalles del error en producción
  const error = process.env.NODE_ENV === 'production' 
    ? 'Error interno del servidor' 
    : err.message;
    
  res.status(err.status || 500).json({ 
    error,
    status: err.status || 500
  });
});

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada'
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
  console.log(`Documentación Swagger disponible en http://localhost:${port}/api-docs`);
}); 
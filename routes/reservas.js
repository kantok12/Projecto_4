const express = require('express');
const router = express.Router();
const {
  crearReserva,
  obtenerReservas,
  obtenerReservaPorId,
  actualizarReserva,
  eliminarReserva
} = require('../controllers/reservasController');

// Rutas CRUD básicas
router.post('/', crearReserva);
router.get('/', obtenerReservas);
router.get('/:id', obtenerReservaPorId);
router.put('/:id', actualizarReserva);
router.delete('/:id', eliminarReserva);

module.exports = router; 
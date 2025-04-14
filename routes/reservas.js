const express = require('express');
const router = express.Router();
const {
  crearReserva,
  obtenerReservas,
  obtenerReservaPorId,
  actualizarReserva,
  eliminarReserva
} = require('../controllers/reservasController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Reserva:
 *       type: object
 *       required:
 *         - hotel
 *         - tipo_habitacion
 *         - num_huespedes
 *         - fecha_inicio
 *         - fecha_fin
 *         - estado
 *       properties:
 *         id:
 *           type: string
 *           description: ID único de la reserva
 *         hotel:
 *           type: string
 *           description: Nombre del hotel
 *         tipo_habitacion:
 *           type: string
 *           description: Tipo de habitación (ej. doble, suite)
 *         num_huespedes:
 *           type: integer
 *           description: Número de huéspedes
 *         fecha_inicio:
 *           type: string
 *           format: date
 *           description: Fecha de inicio de la reserva
 *         fecha_fin:
 *           type: string
 *           format: date
 *           description: Fecha de fin de la reserva
 *         estado:
 *           type: string
 *           enum: [confirmada, pendiente_pago, cancelada]
 *           description: Estado de la reserva
 */

/**
 * @swagger
 * /api/reservas:
 *   post:
 *     summary: Crear una nueva reserva
 *     tags: [Reservas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reserva'
 *     responses:
 *       201:
 *         description: Reserva creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reserva'
 *       400:
 *         description: Datos inválidos
 */
router.post('/', crearReserva);

/**
 * @swagger
 * /api/reservas:
 *   get:
 *     summary: Obtener todas las reservas
 *     tags: [Reservas]
 *     parameters:
 *       - in: query
 *         name: hotel
 *         schema:
 *           type: string
 *         description: Filtrar por nombre de hotel
 *       - in: query
 *         name: fecha_inicio
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha inicio para filtrar
 *       - in: query
 *         name: fecha_fin
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha fin para filtrar
 *       - in: query
 *         name: tipo_habitacion
 *         schema:
 *           type: string
 *         description: Filtrar por tipo de habitación
 *       - in: query
 *         name: estado
 *         schema:
 *           type: string
 *         description: Filtrar por estado
 *       - in: query
 *         name: num_huespedes
 *         schema:
 *           type: integer
 *         description: Filtrar por número de huéspedes
 *     responses:
 *       200:
 *         description: Lista de reservas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reserva'
 */
router.get('/', obtenerReservas);

/**
 * @swagger
 * /api/reservas/{id}:
 *   get:
 *     summary: Obtener una reserva por ID
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la reserva
 *     responses:
 *       200:
 *         description: Reserva encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reserva'
 *       404:
 *         description: Reserva no encontrada
 */
router.get('/:id', obtenerReservaPorId);

/**
 * @swagger
 * /api/reservas/{id}:
 *   put:
 *     summary: Actualizar una reserva
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la reserva
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reserva'
 *     responses:
 *       200:
 *         description: Reserva actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reserva'
 *       404:
 *         description: Reserva no encontrada
 */
router.put('/:id', actualizarReserva);

/**
 * @swagger
 * /api/reservas/{id}:
 *   delete:
 *     summary: Eliminar una reserva
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la reserva
 *     responses:
 *       204:
 *         description: Reserva eliminada
 *       404:
 *         description: Reserva no encontrada
 */
router.delete('/:id', eliminarReserva);

module.exports = router; 
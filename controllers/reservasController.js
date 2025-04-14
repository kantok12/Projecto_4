const { v4: uuidv4 } = require('uuid');

// Almacenamiento en memoria
let reservas = [];

// Función auxiliar para filtrar reservas
const filtrarReservas = (query) => {
  return reservas.filter((reserva) => {
    let cumpleFiltros = true;

    if (query.hotel) {
      cumpleFiltros = cumpleFiltros && reserva.hotel.toLowerCase().includes(query.hotel.toLowerCase());
    }
    if (query.fecha_inicio && query.fecha_fin) {
      cumpleFiltros = cumpleFiltros && 
        reserva.fecha_inicio >= query.fecha_inicio && 
        reserva.fecha_fin <= query.fecha_fin;
    }
    if (query.tipo_habitacion) {
      cumpleFiltros = cumpleFiltros && 
        reserva.tipo_habitacion.toLowerCase() === query.tipo_habitacion.toLowerCase();
    }
    if (query.estado) {
      cumpleFiltros = cumpleFiltros && 
        reserva.estado.toLowerCase() === query.estado.toLowerCase();
    }
    if (query.num_huespedes) {
      cumpleFiltros = cumpleFiltros && 
        reserva.num_huespedes === parseInt(query.num_huespedes);
    }

    return cumpleFiltros;
  });
};

// Controladores
const crearReserva = (req, res) => {
  const { hotel, tipo_habitacion, num_huespedes, fecha_inicio, fecha_fin, estado } = req.body;

  // Validación de campos obligatorios
  if (!hotel || !tipo_habitacion || !num_huespedes || !fecha_inicio || !fecha_fin || !estado) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Validación de estado
  const estadosValidos = ['confirmada', 'pendiente_pago', 'cancelada'];
  if (!estadosValidos.includes(estado)) {
    return res.status(400).json({ error: 'Estado no válido' });
  }

  const nuevaReserva = {
    id: uuidv4(),
    hotel,
    tipo_habitacion,
    num_huespedes,
    fecha_inicio,
    fecha_fin,
    estado
  };

  reservas.push(nuevaReserva);
  res.status(201).json(nuevaReserva);
};

const obtenerReservas = (req, res) => {
  const reservasFiltradas = filtrarReservas(req.query);
  res.json(reservasFiltradas);
};

const obtenerReservaPorId = (req, res) => {
  const reserva = reservas.find(r => r.id === req.params.id);
  if (!reserva) {
    return res.status(404).json({ error: 'Reserva no encontrada' });
  }
  res.json(reserva);
};

const actualizarReserva = (req, res) => {
  const { hotel, tipo_habitacion, num_huespedes, fecha_inicio, fecha_fin, estado } = req.body;

  // Validación de campos obligatorios
  if (!hotel || !tipo_habitacion || !num_huespedes || !fecha_inicio || !fecha_fin || !estado) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const index = reservas.findIndex(r => r.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Reserva no encontrada' });
  }

  reservas[index] = {
    ...reservas[index],
    hotel,
    tipo_habitacion,
    num_huespedes,
    fecha_inicio,
    fecha_fin,
    estado
  };

  res.json(reservas[index]);
};

const eliminarReserva = (req, res) => {
  const index = reservas.findIndex(r => r.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Reserva no encontrada' });
  }

  reservas.splice(index, 1);
  res.status(204).send();
};

module.exports = {
  crearReserva,
  obtenerReservas,
  obtenerReservaPorId,
  actualizarReserva,
  eliminarReserva
}; 
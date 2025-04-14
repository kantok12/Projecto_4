import axios from 'axios';
import { Reserva, ReservaFormData } from '../types';

const API_URL = 'http://localhost:3005/api';

export const api = {
  crearReserva: async (reserva: ReservaFormData): Promise<Reserva> => {
    const response = await axios.post(`${API_URL}/reservas`, reserva);
    return response.data;
  },

  obtenerReservas: async (filtros?: Partial<ReservaFormData>): Promise<Reserva[]> => {
    const response = await axios.get(`${API_URL}/reservas`, { params: filtros });
    return response.data;
  },

  obtenerReservaPorId: async (id: string): Promise<Reserva> => {
    const response = await axios.get(`${API_URL}/reservas/${id}`);
    return response.data;
  },

  actualizarReserva: async (id: string, reserva: ReservaFormData): Promise<Reserva> => {
    const response = await axios.put(`${API_URL}/reservas/${id}`, reserva);
    return response.data;
  },

  eliminarReserva: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/reservas/${id}`);
  }
}; 
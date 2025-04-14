export interface Reserva {
  id?: string;
  huesped: string;
  checkin: string;
  checkout: string;
  dias: number;
  habitacion: string;
  personas: number;
  monto_total: number;
  registro: string;
  usuario: string;
}

export interface ReservaFormData extends Omit<Reserva, 'id' | 'dias' | 'monto_total' | 'registro'> {} 
import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel
} from '@mui/material';
import { Reserva } from '../types';
import { api } from '../services/api';

export const ListaReservas: React.FC = () => {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [registrosPorPagina, setRegistrosPorPagina] = useState<number>(10);
  const [busqueda, setBusqueda] = useState<string>('');

  useEffect(() => {
    cargarReservas();
  }, []);

  const cargarReservas = async () => {
    try {
      const data = await api.obtenerReservas();
      setReservas(data);
    } catch (error) {
      console.error('Error al cargar las reservas:', error);
      alert('Error al cargar las reservas');
    }
  };

  const handleEliminar = async (id: string) => {
    if (window.confirm('¿Está seguro de eliminar esta reserva?')) {
      try {
        await api.eliminarReserva(id);
        await cargarReservas();
      } catch (error) {
        console.error('Error al eliminar la reserva:', error);
        alert('Error al eliminar la reserva');
      }
    }
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Lista Reservas
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography>Mostrar</Typography>
            <FormControl size="small" sx={{ width: 100 }}>
              <Select
                value={registrosPorPagina}
                onChange={(e) => setRegistrosPorPagina(Number(e.target.value))}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </FormControl>
            <Typography>registros</Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography>Buscar:</Typography>
            <TextField
              size="small"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <Button variant="contained" color="primary">
              Nueva Reserva
            </Button>
          </Box>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell align="center">#</TableCell>
                <TableCell>Huésped</TableCell>
                <TableCell>Checkin</TableCell>
                <TableCell>Checkout</TableCell>
                <TableCell align="center"># días</TableCell>
                <TableCell>Habitación</TableCell>
                <TableCell align="center"># Personas</TableCell>
                <TableCell align="right">Monto Total</TableCell>
                <TableCell>Registro</TableCell>
                <TableCell>Usuario</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reservas.map((reserva, index) => (
                <TableRow key={reserva.id} sx={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell>{reserva.huesped}</TableCell>
                  <TableCell>{reserva.checkin}</TableCell>
                  <TableCell>{reserva.checkout}</TableCell>
                  <TableCell align="center">{reserva.dias}</TableCell>
                  <TableCell>{reserva.habitacion}</TableCell>
                  <TableCell align="center">{reserva.personas}</TableCell>
                  <TableCell align="right">{reserva.monto_total.toFixed(1)}</TableCell>
                  <TableCell>{reserva.registro}</TableCell>
                  <TableCell>{reserva.usuario}</TableCell>
                  <TableCell>
                    <Button
                      color="error"
                      size="small"
                      onClick={() => reserva.id && handleEliminar(reserva.id)}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}; 
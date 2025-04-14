import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Container,
  Grid,
  Paper
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { es } from 'date-fns/locale';
import { ReservaFormData } from '../types';
import { api } from '../services/api';

const habitaciones = [
  'MATRIMONIAL 201',
  'SIMPLE 101',
  'MATRIMONIAL 202',
  'SIMPLE 102'
];

export const ReservaForm: React.FC = () => {
  const [formData, setFormData] = useState<ReservaFormData>({
    huesped: '',
    checkin: new Date().toISOString().split('T')[0],
    checkout: new Date().toISOString().split('T')[0],
    habitacion: '',
    personas: 1,
    usuario: '30495867'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.crearReserva(formData);
      alert('Reserva creada con éxito');
      // Limpiar formulario
      setFormData({
        huesped: '',
        checkin: new Date().toISOString().split('T')[0],
        checkout: new Date().toISOString().split('T')[0],
        habitacion: '',
        personas: 1,
        usuario: '30495867'
      });
    } catch (error) {
      alert('Error al crear la reserva');
      console.error(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name as string]: value
    }));
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Nueva Reserva
        </Typography>

        <Paper sx={{ p: 3 }}>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Huésped"
                  name="huesped"
                  value={formData.huesped}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
                  <DatePicker
                    label="Check-in"
                    value={new Date(formData.checkin)}
                    onChange={(newValue) => {
                      if (newValue) {
                        setFormData(prev => ({
                          ...prev,
                          checkin: newValue.toISOString().split('T')[0]
                        }));
                      }
                    }}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
                  <DatePicker
                    label="Check-out"
                    value={new Date(formData.checkout)}
                    onChange={(newValue) => {
                      if (newValue) {
                        setFormData(prev => ({
                          ...prev,
                          checkout: newValue.toISOString().split('T')[0]
                        }));
                      }
                    }}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>Habitación</InputLabel>
                  <Select
                    name="habitacion"
                    value={formData.habitacion}
                    onChange={handleChange}
                    label="Habitación"
                  >
                    {habitaciones.map(hab => (
                      <MenuItem key={hab} value={hab}>
                        {hab}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="number"
                  label="Número de Personas"
                  name="personas"
                  value={formData.personas}
                  onChange={handleChange}
                  InputProps={{ inputProps: { min: 1 } }}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                  <Button
                    type="button"
                    variant="outlined"
                    color="primary"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Guardar
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}; 
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, CssBaseline, Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale';
import { ReservaForm } from './components/ReservaForm';
import { ListaReservas } from './components/ListaReservas';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
      <Router>
        <CssBaseline />
        <AppBar position="static" sx={{ backgroundColor: '#2c3e50' }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 0, marginRight: 4 }}>
              HOTEL
            </Typography>
            <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
              <Button color="inherit" component={Link} to="/">
                Reservas
              </Button>
              <Button color="inherit">
                Habitaciones
              </Button>
              <Button color="inherit">
                Huéspedes
              </Button>
              <Button color="inherit">
                Usuarios
              </Button>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body1">
                Armando Paredes Cuadros
              </Typography>
              <Button 
                color="error" 
                variant="contained" 
                size="small"
                sx={{ 
                  backgroundColor: '#e74c3c',
                  '&:hover': {
                    backgroundColor: '#c0392b'
                  }
                }}
              >
                Cerrar Sesión
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        <Container>
          <Routes>
            <Route path="/" element={<ListaReservas />} />
            <Route path="/nueva" element={<ReservaForm />} />
          </Routes>
        </Container>
      </Router>
    </LocalizationProvider>
  );
}

export default App;

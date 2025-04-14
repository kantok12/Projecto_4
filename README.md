# API de Gestión de Reservas de Hotel

API REST para gestionar reservas de hotel con almacenamiento en memoria. Esta API permite a viajeros, recepcionistas y gerentes gestionar reservas de manera eficiente.

## Instalación

```bash
npm install
```

## Desarrollo

Para ejecutar el servidor en modo desarrollo:

```bash
npm run dev
```

## Producción

Para ejecutar el servidor en modo producción:

```bash
npm start
```

## Casos de Uso y Endpoints

### 1. Crear Reserva
**Como viajero**, puedo hacer una reserva en el hotel especificando los detalles necesarios.

- **POST** `/api/reservas`
- **Body**:
```json
{
  "hotel": "Hotel Paraíso",
  "tipo_habitacion": "doble",
  "num_huespedes": 3,
  "fecha_inicio": "2023-05-15",
  "fecha_fin": "2023-05-17",
  "estado": "confirmada",
  "detalles_huespedes": {
    "adultos": 2,
    "ninos": 1
  }
}
```

### 2. Obtener Lista de Reservas
**Como gerente del hotel**, puedo ver todas las reservas con diferentes filtros.

- **GET** `/api/reservas`
- **Query Params** (opcionales):
  - `hotel`: Nombre del hotel (ej: "Hotel Paraíso")
  - `fecha_inicio`: Fecha de inicio (YYYY-MM-DD)
  - `fecha_fin`: Fecha de fin (YYYY-MM-DD)
  - `tipo_habitacion`: Tipo de habitación (ej: "doble", "suite")
  - `estado`: Estado de la reserva (confirmada, pendiente_pago, cancelada)
  - `num_huespedes`: Número total de huéspedes

### 3. Obtener Reserva Específica
**Como recepcionista**, puedo verificar los detalles de una reserva específica.

- **GET** `/api/reservas/:id`

### 4. Actualizar Reserva
**Como huésped o recepcionista**, puedo modificar los detalles de una reserva existente.

- **PUT** `/api/reservas/:id`
- **Body**: (Mismos campos que en la creación)

### 5. Eliminar Reserva
**Como viajero o personal del hotel**, puedo cancelar una reserva existente.

- **DELETE** `/api/reservas/:id`

## Ejemplos de Casos de Uso Específicos

### Crear una Nueva Reserva para Familia
```bash
curl -X POST http://localhost:3000/api/reservas \
  -H "Content-Type: application/json" \
  -d '{
    "hotel": "Hotel Paraíso",
    "tipo_habitacion": "doble",
    "num_huespedes": 3,
    "fecha_inicio": "2023-05-15",
    "fecha_fin": "2023-05-17",
    "estado": "confirmada",
    "detalles_huespedes": {
      "adultos": 2,
      "ninos": 1
    }
  }'
```

### Consultar Reservas del Día (Gerente)
```bash
curl "http://localhost:3000/api/reservas?fecha_inicio=2024-01-20&fecha_fin=2024-01-20"
```

### Verificar Reserva Específica (Recepción)
```bash
curl http://localhost:3000/api/reservas/12345
```

### Cambiar Tipo de Habitación
```bash
curl -X PUT http://localhost:3000/api/reservas/12345 \
  -H "Content-Type: application/json" \
  -d '{
    "hotel": "Hotel Paraíso",
    "tipo_habitacion": "suite",
    "num_huespedes": 3,
    "fecha_inicio": "2023-05-15",
    "fecha_fin": "2023-05-17",
    "estado": "confirmada"
  }'
```

### Cancelar Reserva
```bash
curl -X DELETE http://localhost:3000/api/reservas/12345
```

### Ejemplos de Filtros Específicos

#### Ver Reservas de un Hotel Específico
```bash
curl "http://localhost:3000/api/reservas?hotel=Hotel%20Para%C3%ADso"
```

#### Ver Reservas para Semana de Navidad
```bash
curl "http://localhost:3000/api/reservas?fecha_inicio=2024-12-24&fecha_fin=2024-12-31"
```

#### Ver Reservas de Suites
```bash
curl "http://localhost:3000/api/reservas?tipo_habitacion=suite"
```

#### Ver Reservas Pendientes de Pago
```bash
curl "http://localhost:3000/api/reservas?estado=pendiente_pago"
```

#### Ver Reservas de Grupos Grandes
```bash
curl "http://localhost:3000/api/reservas?num_huespedes=5"
```

## Notas Importantes

- Todas las fechas deben enviarse en formato ISO (YYYY-MM-DD)
- Los estados válidos son: "confirmada", "pendiente_pago", "cancelada"
- Los tipos de habitación disponibles son: "individual", "doble", "suite", "suite familiar"
- El número de huéspedes debe ser consistente con el tipo de habitación seleccionada
- Las reservas requieren al menos un día de anticipación 
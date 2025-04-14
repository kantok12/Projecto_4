# API de Gestión de Reservas de Hotel

API REST para gestionar reservas de hotel con almacenamiento en memoria.

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

## Endpoints

### Crear Reserva
- **POST** `/api/reservas`
- **Body**:
```json
{
  "hotel": "Hotel Paraíso",
  "tipo_habitacion": "doble",
  "num_huespedes": 3,
  "fecha_inicio": "2023-05-15",
  "fecha_fin": "2023-05-17",
  "estado": "confirmada"
}
```

### Obtener Reservas
- **GET** `/api/reservas`
- **Query Params** (opcionales):
  - `hotel`: Filtrar por nombre de hotel
  - `fecha_inicio` y `fecha_fin`: Filtrar por rango de fechas
  - `tipo_habitacion`: Filtrar por tipo de habitación
  - `estado`: Filtrar por estado (confirmada, pendiente_pago, cancelada)
  - `num_huespedes`: Filtrar por número de huéspedes

### Obtener Reserva por ID
- **GET** `/api/reservas/:id`

### Actualizar Reserva
- **PUT** `/api/reservas/:id`
- **Body**: Mismo formato que en POST

### Eliminar Reserva
- **DELETE** `/api/reservas/:id`

## Ejemplos de uso con cURL

### Crear una reserva
```bash
curl -X POST http://localhost:3000/api/reservas \
  -H "Content-Type: application/json" \
  -d '{
    "hotel": "Hotel Paraíso",
    "tipo_habitacion": "doble",
    "num_huespedes": 3,
    "fecha_inicio": "2023-05-15",
    "fecha_fin": "2023-05-17",
    "estado": "confirmada"
  }'
```

### Obtener todas las reservas
```bash
curl http://localhost:3000/api/reservas
```

### Filtrar reservas
```bash
curl "http://localhost:3000/api/reservas?hotel=Paraíso&estado=confirmada"
```

### Obtener una reserva específica
```bash
curl http://localhost:3000/api/reservas/123
```

### Actualizar una reserva
```bash
curl -X PUT http://localhost:3000/api/reservas/123 \
  -H "Content-Type: application/json" \
  -d '{
    "hotel": "Hotel Paraíso",
    "tipo_habitacion": "suite",
    "num_huespedes": 2,
    "fecha_inicio": "2023-05-15",
    "fecha_fin": "2023-05-17",
    "estado": "confirmada"
  }'
```

### Eliminar una reserva
```bash
curl -X DELETE http://localhost:3000/api/reservas/123
``` 
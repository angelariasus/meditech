const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./routes/auth.routes');
const pacienteRoutes = require('./routes/paciente.routes');
const medicoRoutes = require('./routes/medico.routes');
const citaRoutes = require('./routes/cita.routes');
const historialRoutes = require('./routes/historial.routes');
const dashboardRoutes = require('./routes/dashboard.routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Seguridad HTTP headers
app.use(helmet());

// CORS
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '').split(',');
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error('Origen no permitido por CORS'));
  },
  credentials: true,
}));

// Rate limiting global
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100,
  message: { status: 'error', message: 'Demasiadas peticiones, intenta más tarde.' },
}));

// Parseo de JSON
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/pacientes', pacienteRoutes);
app.use('/api/medicos', medicoRoutes);
app.use('/api/citas', citaRoutes);
app.use('/api/historial', historialRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Ruta principal - Información de la API
app.get('/', (req, res) => {
  res.json({
    name: 'Meditech API REST',
    version: '1.0.0',
    description: 'API para la gestión de pacientes, médicos, citas e historiales clínicos.',
    docs: 'Consulta el contrato de la API para más detalles.',
    endpoints: [
      '/api/auth',
      '/api/pacientes',
      '/api/medicos',
      '/api/citas',
      '/api/historial',
      '/api/dashboard',
      '/api/health'
    ]
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404
app.use((req, res) => {
  res.status(404).json({ status: 'error', message: 'Ruta no encontrada.' });
});

// Manejador global de errores (debe ir al final)
app.use(errorHandler);

module.exports = app;

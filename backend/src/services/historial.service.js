const historialModel = require('../models/historial.model');
const pacienteModel = require('../models/paciente.model');
const { pool } = require('../config/database');

async function getByPaciente(paciente_id, { page = 1, limit = 20 } = {}) {
  const paciente = await pacienteModel.findById(paciente_id);
  if (!paciente) throw { statusCode: 404, message: 'Paciente no encontrado.', code: 'NOT_FOUND' };

  const offset = (page - 1) * limit;
  const [data, total] = await Promise.all([
    historialModel.findByPaciente(paciente_id, { limit, offset }),
    historialModel.countByPaciente(paciente_id),
  ]);
  return { data, total, page, limit };
}

async function create(data, user) {
  // Obtener el id del médico a partir del user_id
  const { rows } = await pool.query('SELECT id FROM medicos WHERE user_id = $1', [user.id]);
  if (!rows[0]) throw { statusCode: 403, message: 'Solo médicos pueden crear registros en el historial.', code: 'FORBIDDEN' };

  const paciente = await pacienteModel.findById(data.paciente_id);
  if (!paciente) throw { statusCode: 404, message: 'Paciente no encontrado.', code: 'NOT_FOUND' };

  return historialModel.create({ ...data, medico_id: rows[0].id });
}

module.exports = { getByPaciente, create };

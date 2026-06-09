const pacienteModel = require('../models/paciente.model');
const authService = require('./auth.service');

async function getAll({ page = 1, limit = 20, search = '' }) {
  const offset = (page - 1) * limit;
  const [data, total] = await Promise.all([
    pacienteModel.findAll({ limit, offset, search }),
    pacienteModel.count(search),
  ]);
  return { data, total, page, limit };
}

async function getById(id) {
  const paciente = await pacienteModel.findById(id);
  if (!paciente) throw { statusCode: 404, message: 'Paciente no encontrado.', code: 'NOT_FOUND' };
  return paciente;
}

async function create({ email, password, ...perfilData }) {
  // Crear usuario y perfil de paciente en una sola operación lógica
  const user = await authService.register({ email, password, rol: 'paciente' });
  const paciente = await pacienteModel.create({ user_id: user.id, ...perfilData });
  return paciente;
}

async function update(id, data) {
  const existing = await pacienteModel.findById(id);
  if (!existing) throw { statusCode: 404, message: 'Paciente no encontrado.', code: 'NOT_FOUND' };

  return pacienteModel.update(id, { ...existing, ...data });
}

module.exports = { getAll, getById, create, update };

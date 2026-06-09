const medicoModel = require('../models/medico.model');
const authService = require('./auth.service');

async function getAll({ page = 1, limit = 20, especialidad = '' }) {
  const offset = (page - 1) * limit;
  const [data, total] = await Promise.all([
    medicoModel.findAll({ limit, offset, especialidad }),
    medicoModel.count(especialidad),
  ]);
  return { data, total, page, limit };
}

async function getById(id) {
  const medico = await medicoModel.findById(id);
  if (!medico) throw { statusCode: 404, message: 'Médico no encontrado.', code: 'NOT_FOUND' };
  return medico;
}

async function create({ email, password, ...perfilData }) {
  const user = await authService.register({ email, password, rol: 'medico' });
  return medicoModel.create({ user_id: user.id, ...perfilData });
}

async function update(id, data) {
  const existing = await medicoModel.findById(id);
  if (!existing) throw { statusCode: 404, message: 'Médico no encontrado.', code: 'NOT_FOUND' };
  return medicoModel.update(id, { ...existing, ...data });
}

async function getDisponibilidad(medico_id) {
  await getById(medico_id); // lanza 404 si no existe
  return medicoModel.getDisponibilidad(medico_id);
}

async function setDisponibilidad(medico_id, slots) {
  await getById(medico_id);
  if (!Array.isArray(slots) || slots.length === 0) {
    throw { statusCode: 400, message: 'Se requiere un arreglo de slots de disponibilidad.', code: 'INVALID_SLOTS' };
  }
  await medicoModel.setDisponibilidad(medico_id, slots);
  return medicoModel.getDisponibilidad(medico_id);
}

module.exports = { getAll, getById, create, update, getDisponibilidad, setDisponibilidad };

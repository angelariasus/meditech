const citaModel = require('../models/cita.model');
const pacienteModel = require('../models/paciente.model');
const medicoModel = require('../models/medico.model');

async function getAll(filters) {
  return citaModel.findAll(filters);
}

async function getById(id) {
  const cita = await citaModel.findById(id);
  if (!cita) throw { statusCode: 404, message: 'Cita no encontrada.', code: 'NOT_FOUND' };
  return cita;
}

async function getCitasDelUsuario(user) {
  if (user.rol === 'paciente') {
    const paciente = await pacienteModel.findByUserId(user.id);
    if (!paciente) throw { statusCode: 404, message: 'Perfil de paciente no encontrado.' };
    return citaModel.findAll({ paciente_id: paciente.id });
  }
  if (user.rol === 'medico') {
    // Buscar el perfil de médico por user_id
    const { pool } = require('../config/database');
    const { rows } = await pool.query('SELECT id FROM medicos WHERE user_id = $1', [user.id]);
    if (!rows[0]) throw { statusCode: 404, message: 'Perfil de médico no encontrado.' };
    return citaModel.findAll({ medico_id: rows[0].id });
  }
  // admin: devuelve todas
  return citaModel.findAll({});
}

async function create(data) {
  const { paciente_id, medico_id, fecha_hora, duracion_min = 30, motivo } = data;

  // Verificar que existen paciente y médico
  const [paciente, medico] = await Promise.all([
    pacienteModel.findById(paciente_id),
    medicoModel.findById(medico_id),
  ]);
  if (!paciente) throw { statusCode: 404, message: 'Paciente no encontrado.', code: 'PACIENTE_NOT_FOUND' };
  if (!medico)   throw { statusCode: 404, message: 'Médico no encontrado.', code: 'MEDICO_NOT_FOUND' };

  // Verificar que la fecha no sea en el pasado
  if (new Date(fecha_hora) <= new Date()) {
    throw { statusCode: 400, message: 'La fecha de la cita debe ser futura.', code: 'PAST_DATE' };
  }

  // Verificar conflicto de horario
  const conflict = await citaModel.checkConflict(medico_id, fecha_hora, duracion_min);
  if (conflict) {
    throw { statusCode: 409, message: 'El médico ya tiene una cita en ese horario.', code: 'SLOT_UNAVAILABLE' };
  }

  return citaModel.create({ paciente_id, medico_id, fecha_hora, duracion_min, motivo });
}

async function update(id, data, user) {
  const cita = await getById(id);

  // Un paciente solo puede cancelar sus propias citas
  if (user.rol === 'paciente') {
    const paciente = await pacienteModel.findByUserId(user.id);
    if (!paciente || cita.paciente_id !== paciente.id) {
      throw { statusCode: 403, message: 'No puedes modificar esta cita.', code: 'FORBIDDEN' };
    }
    if (data.estado && data.estado !== 'cancelada') {
      throw { statusCode: 403, message: 'Los pacientes solo pueden cancelar citas.', code: 'FORBIDDEN' };
    }
  }

  // No se puede modificar una cita ya completada o cancelada
  if (['completada', 'cancelada'].includes(cita.estado)) {
    throw { statusCode: 400, message: `No se puede modificar una cita en estado '${cita.estado}'.`, code: 'INVALID_STATE' };
  }

  // Si se reprograma, verificar conflicto
  if (data.fecha_hora && data.fecha_hora !== cita.fecha_hora) {
    if (new Date(data.fecha_hora) <= new Date()) {
      throw { statusCode: 400, message: 'La nueva fecha debe ser futura.', code: 'PAST_DATE' };
    }
    const conflict = await citaModel.checkConflict(cita.medico_id, data.fecha_hora, cita.duracion_min, id);
    if (conflict) {
      throw { statusCode: 409, message: 'El médico ya tiene una cita en ese horario.', code: 'SLOT_UNAVAILABLE' };
    }
  }

  return citaModel.update(id, data);
}

module.exports = { getAll, getById, getCitasDelUsuario, create, update };

const { prisma } = require('../config/database');

async function findByPaciente(paciente_id, { limit = 20, offset = 0 } = {}) {
  const historial = await prisma.historialClinico.findMany({
    where: { paciente_id },
    skip: offset,
    take: limit,
    orderBy: { fecha: 'desc' },
    include: {
      medico: {
        select: { nombre: true, apellido: true, especialidad: true }
      }
    }
  });

  return historial.map(h => ({
    ...h,
    medico_nombre: `${h.medico.nombre} ${h.medico.apellido}`,
    especialidad: h.medico.especialidad
  }));
}

async function countByPaciente(paciente_id) {
  return await prisma.historialClinico.count({
    where: { paciente_id }
  });
}

async function findById(id) {
  const h = await prisma.historialClinico.findUnique({
    where: { id },
    include: {
      medico: {
        select: { nombre: true, apellido: true, especialidad: true }
      },
      paciente: {
        select: { nombre: true, apellido: true }
      }
    }
  });

  if (!h) return null;
  return {
    ...h,
    medico_nombre: `${h.medico.nombre} ${h.medico.apellido}`,
    especialidad: h.medico.especialidad,
    paciente_nombre: `${h.paciente.nombre} ${h.paciente.apellido}`
  };
}

async function create(data) {
  return await prisma.historialClinico.create({
    data: {
      paciente_id: data.paciente_id,
      cita_id: data.cita_id || null,
      medico_id: data.medico_id,
      diagnostico: data.diagnostico,
      receta: data.receta,
      resultado_url: data.resultado_url,
      observaciones: data.observaciones
    }
  });
}

module.exports = { findByPaciente, countByPaciente, findById, create };

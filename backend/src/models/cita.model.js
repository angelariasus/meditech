const { prisma } = require('../config/database');

async function findAll({ paciente_id, medico_id, estado, fecha_desde, fecha_hasta, limit = 20, offset = 0 }) {
  const where = {};
  if (paciente_id) where.paciente_id = paciente_id;
  if (medico_id) where.medico_id = medico_id;
  if (estado) where.estado = estado;
  if (fecha_desde || fecha_hasta) {
    where.fecha_hora = {};
    if (fecha_desde) where.fecha_hora.gte = new Date(fecha_desde);
    if (fecha_hasta) where.fecha_hora.lte = new Date(fecha_hasta);
  }

  const citas = await prisma.cita.findMany({
    where,
    skip: offset,
    take: limit,
    orderBy: { fecha_hora: 'desc' },
    include: {
      paciente: {
        select: { nombre: true, apellido: true }
      },
      medico: {
        select: { nombre: true, apellido: true, especialidad: true }
      }
    }
  });

  return citas.map(c => ({
    ...c,
    paciente_nombre: `${c.paciente.nombre} ${c.paciente.apellido}`,
    medico_nombre: `${c.medico.nombre} ${c.medico.apellido}`,
    especialidad: c.medico.especialidad
  }));
}

async function findById(id) {
  const c = await prisma.cita.findUnique({
    where: { id },
    include: {
      paciente: {
        select: { nombre: true, apellido: true }
      },
      medico: {
        select: { nombre: true, apellido: true, especialidad: true }
      }
    }
  });

  if (!c) return null;
  return {
    ...c,
    paciente_nombre: `${c.paciente.nombre} ${c.paciente.apellido}`,
    medico_nombre: `${c.medico.nombre} ${c.medico.apellido}`,
    especialidad: c.medico.especialidad
  };
}

async function checkConflict(medico_id, fecha_hora, duracion_min = 30, exclude_id = null) {
  const fecha = new Date(fecha_hora);
  const fin = new Date(fecha.getTime() + duracion_min * 60000);

  const citas = await prisma.cita.findMany({
    where: {
      medico_id,
      estado: { not: 'cancelada' },
      ...(exclude_id ? { id: { not: exclude_id } } : {}),
    }
  });

  // Prisma no tiene soporte nativo para sumar campos de la db a una fecha en la consulta con findMany facilmente
  // Haremos la evaluacion de solapamiento en memoria ya que findMany recupera las citas del medico (idealmente filtras por rango)
  const conflict = citas.some(cita => {
    const citaInicio = new Date(cita.fecha_hora);
    const citaFin = new Date(citaInicio.getTime() + cita.duracion_min * 60000);
    
    // Check overlap: start < citaFin AND end > citaInicio
    return fecha < citaFin && fin > citaInicio;
  });

  return conflict;
}

async function create(data) {
  return await prisma.cita.create({
    data: {
      paciente_id: data.paciente_id,
      medico_id: data.medico_id,
      fecha_hora: new Date(data.fecha_hora),
      duracion_min: data.duracion_min || 30,
      motivo: data.motivo,
    }
  });
}

async function update(id, data) {
  const updateData = {};
  if (data.fecha_hora !== undefined) updateData.fecha_hora = new Date(data.fecha_hora);
  if (data.estado !== undefined) updateData.estado = data.estado;
  if (data.motivo !== undefined) updateData.motivo = data.motivo;
  if (data.notas_medico !== undefined) updateData.notas_medico = data.notas_medico;

  return await prisma.cita.update({
    where: { id },
    data: updateData
  });
}

module.exports = { findAll, findById, checkConflict, create, update };

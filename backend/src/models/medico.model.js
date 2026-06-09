const { prisma } = require('../config/database');

async function findAll({ limit = 20, offset = 0, especialidad = '' }) {
  const where = {
    activo: true,
    ...(especialidad ? { especialidad: { contains: especialidad, mode: 'insensitive' } } : {})
  };

  const medicos = await prisma.medico.findMany({
    where,
    skip: offset,
    take: limit,
    orderBy: [
      { apellido: 'asc' },
      { nombre: 'asc' }
    ],
    include: {
      user: {
        select: { email: true }
      }
    }
  });

  return medicos.map(m => ({ ...m, email: m.user.email }));
}

async function count(especialidad = '') {
  const where = {
    activo: true,
    ...(especialidad ? { especialidad: { contains: especialidad, mode: 'insensitive' } } : {})
  };

  return await prisma.medico.count({ where });
}

async function findById(id) {
  const m = await prisma.medico.findUnique({
    where: { id },
    include: {
      user: {
        select: { email: true }
      }
    }
  });

  if (!m) return null;
  return { ...m, email: m.user.email };
}

async function create(data) {
  return await prisma.medico.create({
    data
  });
}

async function update(id, data) {
  return await prisma.medico.update({
    where: { id },
    data
  });
}

async function getDisponibilidad(medico_id) {
  return await prisma.disponibilidad.findMany({
    where: {
      medico_id,
      activo: true
    },
    orderBy: [
      { dia_semana: 'asc' },
      { hora_inicio: 'asc' }
    ]
  });
}

async function setDisponibilidad(medico_id, slots) {
  await prisma.$transaction(async (tx) => {
    // 1. Desactivar todas las disponibilidades existentes para el medico
    await tx.disponibilidad.updateMany({
      where: { medico_id },
      data: { activo: false }
    });

    // 2. Insertar o actualizar los nuevos slots
    for (const slot of slots) {
      const existing = await tx.disponibilidad.findUnique({
        where: {
          medico_id_dia_semana_hora_inicio: {
            medico_id,
            dia_semana: slot.dia_semana,
            hora_inicio: slot.hora_inicio
          }
        }
      });

      if (existing) {
        await tx.disponibilidad.update({
          where: { id: existing.id },
          data: {
            hora_fin: slot.hora_fin,
            activo: true
          }
        });
      } else {
        await tx.disponibilidad.create({
          data: {
            medico_id,
            dia_semana: slot.dia_semana,
            hora_inicio: slot.hora_inicio,
            hora_fin: slot.hora_fin,
            activo: true
          }
        });
      }
    }
  });
}

module.exports = { findAll, count, findById, create, update, getDisponibilidad, setDisponibilidad };

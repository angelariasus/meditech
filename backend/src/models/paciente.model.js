const { prisma } = require('../config/database');

async function findAll({ limit = 20, offset = 0, search = '' }) {
  const where = search ? {
    OR: [
      { nombre: { contains: search, mode: 'insensitive' } },
      { apellido: { contains: search, mode: 'insensitive' } },
      { dni: { contains: search, mode: 'insensitive' } },
    ]
  } : {};

  const pacientes = await prisma.paciente.findMany({
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
  
  return pacientes.map(p => ({ ...p, email: p.user.email }));
}

async function count(search = '') {
  const where = search ? {
    OR: [
      { nombre: { contains: search, mode: 'insensitive' } },
      { apellido: { contains: search, mode: 'insensitive' } },
      { dni: { contains: search, mode: 'insensitive' } },
    ]
  } : {};

  return await prisma.paciente.count({ where });
}

async function findById(id) {
  const p = await prisma.paciente.findUnique({
    where: { id },
    include: {
      user: {
        select: { email: true }
      }
    }
  });

  if (!p) return null;
  return { ...p, email: p.user.email };
}

async function findByUserId(user_id) {
  return await prisma.paciente.findUnique({
    where: { user_id }
  });
}

async function create(data) {
  return await prisma.paciente.create({
    data
  });
}

async function update(id, data) {
  return await prisma.paciente.update({
    where: { id },
    data
  });
}

module.exports = { findAll, count, findById, findByUserId, create, update };

const { prisma } = require('../config/database');

async function findByEmail(email) {
  return await prisma.user.findFirst({
    where: {
      email,
      activo: true,
    },
  });
}

async function findById(id) {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      rol: true,
      activo: true,
      created_at: true,
    },
  });
}

async function create({ email, password_hash, rol }) {
  return await prisma.user.create({
    data: {
      email,
      password_hash,
      rol,
    },
    select: {
      id: true,
      email: true,
      rol: true,
      created_at: true,
    },
  });
}

async function saveRefreshToken(user_id, token, expires_at) {
  await prisma.refreshToken.create({
    data: {
      user_id,
      token,
      expires_at,
    },
  });
}

async function findRefreshToken(token) {
  return await prisma.refreshToken.findFirst({
    where: {
      token,
      expires_at: {
        gt: new Date(),
      },
    },
    include: {
      user: {
        select: {
          rol: true,
        },
      },
    },
  });
}

async function deleteRefreshToken(token) {
  await prisma.refreshToken.delete({
    where: { token },
  });
}

module.exports = { findByEmail, findById, create, saveRefreshToken, findRefreshToken, deleteRefreshToken };

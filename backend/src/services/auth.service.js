const bcrypt = require('bcryptjs');
const userModel = require('../models/user.model');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../utils/jwt');

async function login(email, password) {
  const user = await userModel.findByEmail(email);
  if (!user) throw { statusCode: 401, message: 'Credenciales incorrectas.' };

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) throw { statusCode: 401, message: 'Credenciales incorrectas.' };

  const payload = { id: user.id, email: user.email, rol: user.rol };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  // Persistir refresh token (expira en 7 días)
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  await userModel.saveRefreshToken(user.id, refreshToken, expiresAt);

  return {
    accessToken,
    refreshToken,
    user: { id: user.id, email: user.email, rol: user.rol },
  };
}

async function refresh(refreshToken) {
  let decoded;
  try {
    decoded = verifyRefreshToken(refreshToken);
  } catch {
    throw { statusCode: 401, message: 'Refresh token inválido o expirado.', code: 'INVALID_REFRESH_TOKEN' };
  }

  const stored = await userModel.findRefreshToken(refreshToken);
  if (!stored) throw { statusCode: 401, message: 'Refresh token revocado.', code: 'TOKEN_REVOKED' };

  // Rotación de refresh token
  await userModel.deleteRefreshToken(refreshToken);

  const payload = { id: decoded.id, email: decoded.email, rol: stored.rol };
  const newAccessToken = generateAccessToken(payload);
  const newRefreshToken = generateRefreshToken(payload);

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  await userModel.saveRefreshToken(decoded.id, newRefreshToken, expiresAt);

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
}

async function logout(refreshToken) {
  if (refreshToken) {
    await userModel.deleteRefreshToken(refreshToken);
  }
}

async function register({ email, password, rol = 'paciente' }) {
  const existing = await userModel.findByEmail(email);
  if (existing) throw { statusCode: 409, message: 'El email ya está registrado.', code: 'EMAIL_IN_USE' };

  const password_hash = await bcrypt.hash(password, 12);
  return userModel.create({ email, password_hash, rol });
}

module.exports = { login, refresh, logout, register };

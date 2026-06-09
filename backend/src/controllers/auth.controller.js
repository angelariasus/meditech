const authService = require('../services/auth.service');
const { success, error } = require('../utils/response');

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    return success(res, result, 200);
  } catch (err) {
    next(err);
  }
}

async function refresh(req, res, next) {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return error(res, 'refreshToken requerido.', 400, 'MISSING_FIELDS');
    const tokens = await authService.refresh(refreshToken);
    return success(res, tokens);
  } catch (err) {
    next(err);
  }
}

async function logout(req, res, next) {
  try {
    const { refreshToken } = req.body;
    await authService.logout(refreshToken);
    return success(res, { message: 'Sesión cerrada correctamente.' });
  } catch (err) {
    next(err);
  }
}

module.exports = { login, refresh, logout };

const { verifyAccessToken } = require('../utils/jwt');
const { error } = require('../utils/response');

function authenticate(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return error(res, 'Token de acceso requerido.', 401, 'NO_TOKEN');
  }

  const token = authHeader.split(' ')[1];
  try {
    req.user = verifyAccessToken(token);
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return error(res, 'Token expirado.', 401, 'TOKEN_EXPIRED');
    }
    return error(res, 'Token inválido.', 401, 'INVALID_TOKEN');
  }
}

// Fábrica de middleware RBAC
function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.rol)) {
      return error(res, 'No tienes permisos para esta acción.', 403, 'FORBIDDEN');
    }
    next();
  };
}

module.exports = { authenticate, authorize };

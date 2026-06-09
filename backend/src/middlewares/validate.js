const { error } = require('../utils/response');

// Valida que los campos requeridos estén presentes en req.body
function requireFields(...fields) {
  return (req, res, next) => {
    const missing = fields.filter(f => {
      const val = req.body[f];
      return val === undefined || val === null || val === '';
    });
    if (missing.length > 0) {
      return error(res, `Campos requeridos faltantes: ${missing.join(', ')}.`, 400, 'MISSING_FIELDS');
    }
    next();
  };
}

// Valida formato de UUID en parámetros de ruta
function validateUUID(...params) {
  const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return (req, res, next) => {
    for (const param of params) {
      if (req.params[param] && !UUID_REGEX.test(req.params[param])) {
        return error(res, `El parámetro '${param}' no es un UUID válido.`, 400, 'INVALID_UUID');
      }
    }
    next();
  };
}

module.exports = { requireFields, validateUUID };

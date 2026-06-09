function errorHandler(err, req, res, next) {
  console.error(`[${new Date().toISOString()}] ${err.stack || err.message}`);

  // Error de CORS
  if (err.message && err.message.includes('CORS')) {
    return res.status(403).json({ status: 'error', message: err.message });
  }

  // Error de sintaxis JSON en el body
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ status: 'error', message: 'JSON malformado en el cuerpo de la petición.' });
  }

  // Error de violación de unicidad en PostgreSQL
  if (err.code === '23505') {
    return res.status(409).json({ status: 'error', message: 'Ya existe un registro con ese valor.', code: 'DUPLICATE_ENTRY' });
  }

  // Error de llave foránea en PostgreSQL
  if (err.code === '23503') {
    return res.status(400).json({ status: 'error', message: 'Referencia a un recurso que no existe.', code: 'FOREIGN_KEY_VIOLATION' });
  }

  const statusCode = err.statusCode || 500;
  const message = process.env.NODE_ENV === 'production' && statusCode === 500
    ? 'Error interno del servidor.'
    : err.message || 'Error interno del servidor.';

  res.status(statusCode).json({ status: 'error', message });
}

module.exports = errorHandler;

function success(res, data, statusCode = 200, meta = null) {
  const body = { status: 'success', data };
  if (meta) body.meta = meta;
  return res.status(statusCode).json(body);
}

function error(res, message, statusCode = 500, code = null) {
  const body = { status: 'error', message };
  if (code) body.code = code;
  return res.status(statusCode).json(body);
}

function paginate(res, data, total, page, limit) {
  return success(res, data, 200, {
    total,
    page: Number(page),
    limit: Number(limit),
    pages: Math.ceil(total / limit),
  });
}

module.exports = { success, error, paginate };

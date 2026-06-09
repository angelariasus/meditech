const historialService = require('../services/historial.service');
const { success, paginate } = require('../utils/response');

async function getByPaciente(req, res, next) {
  try {
    const { page = 1, limit = 20 } = req.query;
    const result = await historialService.getByPaciente(req.params.pacienteId, {
      page: Number(page), limit: Number(limit),
    });
    return paginate(res, result.data, result.total, result.page, result.limit);
  } catch (err) { next(err); }
}

async function create(req, res, next) {
  try {
    return success(res, await historialService.create(req.body, req.user), 201);
  } catch (err) { next(err); }
}

module.exports = { getByPaciente, create };

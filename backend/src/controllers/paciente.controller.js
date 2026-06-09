const pacienteService = require('../services/paciente.service');
const { success, error, paginate } = require('../utils/response');

async function getAll(req, res, next) {
  try {
    const { page = 1, limit = 20, search = '' } = req.query;
    const result = await pacienteService.getAll({ page: Number(page), limit: Number(limit), search });
    return paginate(res, result.data, result.total, result.page, result.limit);
  } catch (err) { next(err); }
}

async function getById(req, res, next) {
  try {
    const paciente = await pacienteService.getById(req.params.id);
    return success(res, paciente);
  } catch (err) { next(err); }
}

async function create(req, res, next) {
  try {
    const paciente = await pacienteService.create(req.body);
    return success(res, paciente, 201);
  } catch (err) { next(err); }
}

async function update(req, res, next) {
  try {
    const paciente = await pacienteService.update(req.params.id, req.body);
    return success(res, paciente);
  } catch (err) { next(err); }
}

module.exports = { getAll, getById, create, update };

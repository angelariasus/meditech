const medicoService = require('../services/medico.service');
const { success, paginate } = require('../utils/response');

async function getAll(req, res, next) {
  try {
    const { page = 1, limit = 20, especialidad = '' } = req.query;
    const result = await medicoService.getAll({ page: Number(page), limit: Number(limit), especialidad });
    return paginate(res, result.data, result.total, result.page, result.limit);
  } catch (err) { next(err); }
}

async function getById(req, res, next) {
  try {
    return success(res, await medicoService.getById(req.params.id));
  } catch (err) { next(err); }
}

async function create(req, res, next) {
  try {
    return success(res, await medicoService.create(req.body), 201);
  } catch (err) { next(err); }
}

async function update(req, res, next) {
  try {
    return success(res, await medicoService.update(req.params.id, req.body));
  } catch (err) { next(err); }
}

async function getDisponibilidad(req, res, next) {
  try {
    return success(res, await medicoService.getDisponibilidad(req.params.id));
  } catch (err) { next(err); }
}

async function setDisponibilidad(req, res, next) {
  try {
    const { slots } = req.body;
    return success(res, await medicoService.setDisponibilidad(req.params.id, slots));
  } catch (err) { next(err); }
}

module.exports = { getAll, getById, create, update, getDisponibilidad, setDisponibilidad };

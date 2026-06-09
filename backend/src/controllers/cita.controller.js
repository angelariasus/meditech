const citaService = require('../services/cita.service');
const { success, paginate } = require('../utils/response');

async function getMias(req, res, next) {
  try {
    const citas = await citaService.getCitasDelUsuario(req.user);
    return success(res, citas);
  } catch (err) { next(err); }
}

async function getAll(req, res, next) {
  try {
    const { paciente_id, medico_id, estado, fecha_desde, fecha_hasta, page = 1, limit = 20 } = req.query;
    const citas = await citaService.getAll({
      paciente_id, medico_id, estado, fecha_desde, fecha_hasta,
      limit: Number(limit), offset: (Number(page) - 1) * Number(limit),
    });
    return success(res, citas);
  } catch (err) { next(err); }
}

async function getById(req, res, next) {
  try {
    return success(res, await citaService.getById(req.params.id));
  } catch (err) { next(err); }
}

async function create(req, res, next) {
  try {
    return success(res, await citaService.create(req.body), 201);
  } catch (err) { next(err); }
}

async function update(req, res, next) {
  try {
    return success(res, await citaService.update(req.params.id, req.body, req.user));
  } catch (err) { next(err); }
}

module.exports = { getMias, getAll, getById, create, update };

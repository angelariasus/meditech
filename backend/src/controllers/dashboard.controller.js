const dashboardService = require('../services/dashboard.service');
const { success } = require('../utils/response');

async function getStats(req, res, next) {
  try {
    return success(res, await dashboardService.getStats());
  } catch (err) { next(err); }
}

module.exports = { getStats };

const router = require('express').Router();
const controller = require('../controllers/dashboard.controller');
const { authenticate, authorize } = require('../middlewares/auth');

router.get('/stats', authenticate, authorize('admin'), controller.getStats);

module.exports = router;

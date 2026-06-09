const router = require('express').Router();
const controller = require('../controllers/historial.controller');
const { authenticate, authorize } = require('../middlewares/auth');
const { requireFields, validateUUID } = require('../middlewares/validate');

router.use(authenticate);

router.get('/:pacienteId', authorize('admin','medico'), validateUUID('pacienteId'), controller.getByPaciente);
router.post('/',           authorize('medico'), requireFields('paciente_id','diagnostico'), controller.create);

module.exports = router;

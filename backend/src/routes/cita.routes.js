const router = require('express').Router();
const controller = require('../controllers/cita.controller');
const { authenticate, authorize } = require('../middlewares/auth');
const { requireFields, validateUUID } = require('../middlewares/validate');

router.use(authenticate);

// Citas del usuario autenticado (paciente ve las suyas, médico las suyas, admin todas)
router.get('/mias', controller.getMias);

// Listado filtrable (admin y médico)
router.get('/',    authorize('admin','medico'), controller.getAll);
router.post('/',   authorize('admin','paciente'), requireFields('paciente_id','medico_id','fecha_hora'), controller.create);
router.get('/:id', authorize('admin','medico','paciente'), validateUUID('id'), controller.getById);
router.put('/:id', validateUUID('id'), controller.update);

module.exports = router;

const router = require('express').Router();
const controller = require('../controllers/medico.controller');
const { authenticate, authorize } = require('../middlewares/auth');
const { requireFields, validateUUID } = require('../middlewares/validate');

router.use(authenticate);

router.get('/',    authorize('admin','paciente','medico'), controller.getAll);
router.post('/',   authorize('admin'), requireFields('email','password','nombre','apellido','especialidad','colegiatura'), controller.create);
router.get('/:id', authorize('admin','paciente','medico'), validateUUID('id'), controller.getById);
router.put('/:id', authorize('admin'), validateUUID('id'), controller.update);

router.get('/:id/disponibilidad', authorize('admin','paciente','medico'), validateUUID('id'), controller.getDisponibilidad);
router.put('/:id/disponibilidad', authorize('admin','medico'), validateUUID('id'), controller.setDisponibilidad);

module.exports = router;

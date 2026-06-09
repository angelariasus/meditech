const router = require('express').Router();
const controller = require('../controllers/paciente.controller');
const { authenticate, authorize } = require('../middlewares/auth');
const { requireFields, validateUUID } = require('../middlewares/validate');

router.use(authenticate);

router.get('/',    authorize('admin'), controller.getAll);
router.post('/',   authorize('admin'), requireFields('email','password','nombre','apellido','dni','fecha_nacimiento'), controller.create);
router.get('/:id', authorize('admin','medico'), validateUUID('id'), controller.getById);
router.put('/:id', authorize('admin'), validateUUID('id'), controller.update);

module.exports = router;

const router = require('express').Router();
const rateLimit = require('express-rate-limit');
const controller = require('../controllers/auth.controller');
const { requireFields } = require('../middlewares/validate');
const { authenticate } = require('../middlewares/auth');

// Rate limit más estricto para login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { status: 'error', message: 'Demasiados intentos de inicio de sesión.' },
});

router.post('/login',   loginLimiter, requireFields('email', 'password'), controller.login);
router.post('/refresh', requireFields('refreshToken'), controller.refresh);
router.post('/logout',  authenticate, controller.logout);

module.exports = router;

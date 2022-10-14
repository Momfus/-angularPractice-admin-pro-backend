
/*
   Path: '/api/login'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn, renewToken } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jsw');

const router = Router();

router.post('/',
   [
      check('email', 'El email es obligatorio').isEmail(),
      check('password', 'El password es obligatorio').not().isEmpty(),
      validarCampos

   ],
   login
);

// Ruta a google
router.post('/google',
   [
      check('token', 'El token de google es obligatorio').not().isEmpty(),
      validarCampos

   ],
   googleSignIn
);

// Corroborar estado válido token
router.get('/renew',
   validarJWT,
   renewToken
);


module.exports = router;
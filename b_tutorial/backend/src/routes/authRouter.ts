import { Router } from 'express'
import { body, param } from 'express-validator'
import { AuthController } from '../controllers/AuthController'
import { handleInputErrors } from '../middleware/validation'
import { limiter } from '../config/limiter'
import { authenticate } from '../middleware/auth'

const router = Router()
//!Se puede aplicar a todas las URLs de un grupo
router.use(limiter)

router.post(
  '/create-acount',
  body('name')
    .notEmpty()
    .withMessage('El nombre de la cuenta no puede ir vacío'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('El password es muy corto, mínimo 8 caracteres'),
  body('email').isEmail().withMessage('El correo proporcionado no es válido'),
  handleInputErrors,
  AuthController.createAccount
)

router.post(
  '/confirm-account',
  //limiter, //! Para un solo endpoint
  body('token')
    .notEmpty()
    .isLength({ min: 6, max: 6 })
    .withMessage('Token no valido'),
  handleInputErrors,
  AuthController.confirmAccount
)

router.post(
  '/login',
  body('password').notEmpty().withMessage('El password obligatorio'),
  body('email').isEmail().withMessage('El correo proporcionado no es válido'),
  handleInputErrors,
  AuthController.login
)

router.post(
  '/forgot-password',
  body('email').isEmail().withMessage('El correo proporcionado no es válido'),
  handleInputErrors,
  AuthController.forgotPassword
)

router.post(
  '/validate-token',
  body('token')
    .notEmpty()
    .isLength({ min: 6, max: 6 })
    .withMessage('Token no valido'),
  handleInputErrors,
  AuthController.validateToken
)

router.post(
  '/reset-password/:token',
  param('token')
    .notEmpty()
    .isLength({ min: 6, max: 6 })
    .withMessage('Token no valido'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('El password es muy corto, mínimo 8 caracteres'),
  handleInputErrors,
  AuthController.resetPasswordWithToken
)

router.get('/user', authenticate, AuthController.user)

export default router

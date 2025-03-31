import { Router } from 'express'
import { body } from 'express-validator'
import { AuthController } from '../controllers/AuthController'
import { handleInputErrors } from '../middleware/validation'
import { limiter } from '../config/limiter'

const router = Router()
//!Se puede aplicar a todas las URLs de un grupo
//router.use(limiter)

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
  limiter,
  body('token')
    .notEmpty()
    .isLength({ min: 6, max: 6 })
    .withMessage('Token no valido'),
  handleInputErrors,
  AuthController.confirmAccount
)

export default router

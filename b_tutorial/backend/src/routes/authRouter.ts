import { Router } from 'express'
import { body } from 'express-validator'
import { AuthController } from '../controllers/AuthController'
import { handleInputErrors } from '../middleware/validation'

const router = Router()

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
  body('token')
    .notEmpty()
    .isLength({ min: 6, max: 6 })
    .withMessage('Token no valido'),
  handleInputErrors,
  AuthController.confirmAccount
)

export default router

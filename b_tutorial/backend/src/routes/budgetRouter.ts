import { Router } from 'express'
import { body, param } from 'express-validator'
import { BudgetController } from '../controllers/BudgetController'
import { handleInputErrors } from '../middleware/validation'

const router = Router()

router.get('/', BudgetController.getAll)
router.post(
  '/',
  body('name')
    .notEmpty()
    .withMessage('El nombre del presupuesto es obligatorio'),
  body('amount')
    .isNumeric()
    .withMessage('Cantidad no valida')
    .custom((value) => value > 0)
    .withMessage('El presupuesto debe ser mayor a 0'),
  handleInputErrors,
  BudgetController.create
)
router.get(
  '/:id',
  param('id')
    .isInt()
    .withMessage('El ID no es válido')
    .custom((value) => value > 0)
    .withMessage('El ID no es válido'),
  handleInputErrors,
  BudgetController.getById
)
router.put(
  '/:id',
  param('id')
    .isInt()
    .withMessage('El ID no es válido')
    .custom((value) => value > 0)
    .withMessage('El ID no es válido'),
  body('name')
    .notEmpty()
    .withMessage('El nombre del presupuesto es obligatorio'),
  body('amount')
    .isNumeric()
    .withMessage('Cantidad no valida')
    .custom((value) => value > 0)
    .withMessage('El presupuesto debe ser mayor a 0'),
  handleInputErrors,
  BudgetController.updateById
)
router.delete(
  '/:id',
  param('id')
    .isInt()
    .withMessage('El ID no es válido')
    .custom((value) => value > 0)
    .withMessage('El ID no es válido'),
  handleInputErrors,
  BudgetController.deleteById
)

export default router

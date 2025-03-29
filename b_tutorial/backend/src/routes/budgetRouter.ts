import { Router } from 'express'
import { body, param } from 'express-validator'
import { BudgetController } from '../controllers/BudgetController'
import { handleInputErrors } from '../middleware/validation'
import { validateBudgetId } from '../middleware/budget'

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
router.get('/:id', validateBudgetId, BudgetController.getById)
router.put(
  '/:id',
  validateBudgetId,
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
router.delete('/:id', validateBudgetId, BudgetController.deleteById)

export default router

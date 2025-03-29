import { Router } from 'express'
import { body, param } from 'express-validator'
import { BudgetController } from '../controllers/BudgetController'
import { handleInputErrors } from '../middleware/validation'
import { validateBudgetExists, validateBudgetId } from '../middleware/budget'

const router = Router()

router.param('budgetId', validateBudgetId)
router.param('budgetId', validateBudgetExists)

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
router.get('/:budgetId', BudgetController.getById)
router.put(
  '/:budgetId',
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
router.delete('/:budgetId', BudgetController.deleteById)

export default router

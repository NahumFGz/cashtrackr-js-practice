import { Router } from 'express'
import { BudgetController } from '../controllers/BudgetController'
import {
  validateBudgetExists,
  validateBudgetId,
  validateBudgetInput,
} from '../middleware/budget'
import { handleInputErrors } from '../middleware/validation'
import { ExpensesController } from '../controllers/ExpenseController'
import {
  validateExpenseExists,
  ValidateExpenseId,
  validateExpenseInput,
} from '../middleware/expense'

const router = Router()

//! Rutas de Budget
router.param('budgetId', validateBudgetId)
router.param('budgetId', validateBudgetExists)

router.param('expenseId', ValidateExpenseId)
router.param('expenseId', validateExpenseExists)

router.get('/', BudgetController.getAll)
router.post(
  '/',
  validateBudgetInput,
  handleInputErrors,
  BudgetController.create
)
router.get('/:budgetId', BudgetController.getById)
router.put(
  '/:budgetId',
  validateBudgetInput,
  handleInputErrors,
  BudgetController.updateById
)
router.delete('/:budgetId', BudgetController.deleteById)

//! Rutas de Expenses con patron ROA
router.post(
  '/:budgetId/expenses',
  validateExpenseInput,
  handleInputErrors,
  ExpensesController.create
)
router.get('/:budgetId/expenses/:expenseId', ExpensesController.getById)
router.put('/:budgetId/expenses/:expenseId', ExpensesController.updateById)
router.delete('/:budgetId/expenses/:expenseId', ExpensesController.deleteById)

export default router

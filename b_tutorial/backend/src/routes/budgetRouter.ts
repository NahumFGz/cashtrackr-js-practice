import { Router } from 'express'
import { BudgetController } from '../controllers/BudgetController'
import {
  hasAccess,
  validateBudgetExists,
  validateBudgetId,
  validateBudgetInput,
} from '../middleware/budget'
import { handleInputErrors } from '../middleware/validation'
import { ExpensesController } from '../controllers/ExpenseController'
import {
  belongsToBudget,
  validateExpenseExists,
  ValidateExpenseId,
  validateExpenseInput,
} from '../middleware/expense'
import { authenticate } from '../middleware/auth'

const router = Router()
router.use(authenticate) //Agrega o genera req.user

//! Rutas de Budget
router.param('budgetId', validateBudgetId)
router.param('budgetId', validateBudgetExists) //Agrega o genera req.budget
router.param('budgetId', hasAccess)

router.param('expenseId', ValidateExpenseId)
router.param('expenseId', validateExpenseExists)
router.param('expenseId', belongsToBudget)

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
router.put(
  '/:budgetId/expenses/:expenseId',
  validateExpenseInput,
  handleInputErrors,
  ExpensesController.updateById
)
router.delete('/:budgetId/expenses/:expenseId', ExpensesController.deleteById)

export default router

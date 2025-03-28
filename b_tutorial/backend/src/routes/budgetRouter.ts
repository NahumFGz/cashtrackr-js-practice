import { Router } from 'express'
import { BudgetController } from '../controllers/BudgetController'

const router = Router()

router.get('/', BudgetController.getAll)
router.post('/', BudgetController.getAll)

export default router

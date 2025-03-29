import { Request, Response, NextFunction } from 'express'
import { body, param, validationResult } from 'express-validator'
import Expense from '../models/Expense'

declare global {
  namespace Express {
    interface Request {
      expense?: Expense
    }
  }
}

export const validateExpenseInput = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await body('name')
    .notEmpty()
    .withMessage('El nombre del gasto es obligatorio')
    .run(req)

  await body('amount')
    .isNumeric()
    .withMessage('Cantidad no valida')
    .custom((value) => value > 0)
    .withMessage('El gasto debe ser mayor a 0')
    .run(req)

  next()
}

export const ValidateExpenseId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await param('expenseId')
    .isInt()
    .custom((value) => value > 0)
    .withMessage('ID no valido')
    .run(req)

  let errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  next()
}

export const validateExpenseExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { expenseId } = req.params
    const expense = await Expense.findByPk(expenseId)

    if (!expense) {
      const error = new Error('Gasto no encontrado')
      return res.status(404).json({ error: error.message })
    }
    req.expense = expense

    next()
  } catch (error) {
    //console.log(error)
    res.status(500).json({ error: 'Hubo un error' })
  }
}

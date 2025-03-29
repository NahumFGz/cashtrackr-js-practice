import { Request, Response, NextFunction } from 'express'
import { param, validationResult } from 'express-validator'
import Budget from '../models/Budget'

declare global {
  namespace Express {
    interface Request {
      budget?: Budget
    }
  }
}

export const validateBudgetId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await param('id')
    .isInt()
    .withMessage('El ID no es válido')
    .custom((value) => value > 0)
    .withMessage('El ID no es válido')
    .run(req)

  let errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  next()
}

export const validateBudgetExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const budget = await Budget.findByPk(id)

    if (!budget) {
      const error = new Error('Presupuesto no encontrado')
      return res.status(404).json({ error: error.message })
    }
    req.budget = budget

    next()
  } catch (error) {
    //console.log(error)
    res.status(500).json({ error: 'Hubo un error' })
  }
}

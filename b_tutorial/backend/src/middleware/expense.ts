import { Request, Response, NextFunction } from 'express'
import { body, param, validationResult } from 'express-validator'

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

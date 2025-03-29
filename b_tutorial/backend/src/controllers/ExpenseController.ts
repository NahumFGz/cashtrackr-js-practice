import type { Request, Response } from 'express'
import Expense from '../models/Expense'

export class ExpensesController {
  static create = async (req: Request, res: Response) => {
    // console.log(req.budget.id)
    // console.log(req.params.budgetId)
    const expense = new Expense(req.body)
    expense.budgetId = req.budget.id

    expense.save()
    res.status(201).json('Gasto Agregado Correctamente')

    try {
    } catch (error) {
      //console.log(error)
      res.status(500).json({ error: 'Hubo un erro' })
    }
  }

  static getById = async (req: Request, res: Response) => {
    res.json(req.expense)
  }

  static updateById = async (req: Request, res: Response) => {
    await req.expense.update(req.body)
    res.json('Se actualizó correctamente')
  }

  static deleteById = async (req: Request, res: Response) => {
    await req.expense.destroy()
    res.json('Gasto eliminado')
  }
}

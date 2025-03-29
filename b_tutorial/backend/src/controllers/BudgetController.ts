import type { Request, Response } from 'express'
import Budget from '../models/Budget'

export class BudgetController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const budgets = await Budget.findAll({
        order: [['createdAt', 'DESC']],
        //TODO: Filtrar por el usuario autentificado
      })
      res.json(budgets)
    } catch (error) {
      //console.log(error)
      res.status(500).json({ error: 'Hubo un error' })
    }
  }

  static create = async (req: Request, res: Response) => {
    try {
      const budget = new Budget(req.body)
      await budget.save()
      res.status(201).json('Presupuesto Creado Correctamente')
    } catch (error) {
      //console.log(error)
      res.status(500).json({ error: 'Hubo un error' })
    }
  }

  static getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const budget = await Budget.findByPk(id)

      if (!budget) {
        const error = new Error('Presupuesto no encontrado')
        return res.status(404).json({ error: error.message })
      }

      res.json(budget)
    } catch (error) {
      //console.log(error)
      res.status(500).json({ error: 'Hubo un error' })
    }
  }

  static updateById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const budget = await Budget.findByPk(id)

      if (!budget) {
        const error = new Error('Presupuesto no encontrado')
        return res.status(404).json({ error: error.message })
      }

      await budget.update(req.body)
      res.json('Presupuesto actualizado correctamente')
    } catch (error) {
      //console.log(error)
      res.status(500).json({ error: 'Hubo un error' })
    }
  }

  static deleteById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const budget = await Budget.findByPk(id)

      if (!budget) {
        const error = new Error('Presupuesto no encontrado')
        return res.status(404).json({ error: error.message })
      }

      await budget.destroy()
      res.json('Presupuesto eliminado correctamente')
    } catch (error) {
      //console.log(error)
      res.status(500).json({ error: 'Hubo un error' })
    }
  }
}

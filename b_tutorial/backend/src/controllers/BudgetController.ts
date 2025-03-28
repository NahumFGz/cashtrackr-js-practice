import type { Request, Response } from 'express'

export class BudgetController {
  static getAll = async (req: Request, res: Response) => {
    console.log('Desde /api/budgets')
  }

  static create = async (req: Request, res: Response) => {
    console.log('Desde POST /api/budgets')
  }

  static getById = async (req: Request, res: Response) => {
    console.log('Desde getById /api/budgets/id')
  }

  static updateById = async (req: Request, res: Response) => {
    console.log('Desde updateById /api/budgets/id')
  }

  static deleteById = async (req: Request, res: Response) => {
    console.log('Desde deleteById /api/budgets/id')
  }
}

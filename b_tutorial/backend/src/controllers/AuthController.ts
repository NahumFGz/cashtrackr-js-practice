import type { Request, Response } from 'express'
import User from '../models/User'

export class AuthController {
  static createAccount = async (req: Request, res: Response) => {
    try {
      const user = new User(req.body)
      await user.save()
      res.json('Cuenta creada correctamente')
    } catch (error) {
      //console.log(error)}
      res.status(500).json({ error: 'Hubo un error' })
    }
  }
}
